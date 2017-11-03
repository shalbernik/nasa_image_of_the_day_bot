import Urls from '../../utils/urls';
import * as rp from 'request-promise';
import { nasaEndpoints, nasaMethods } from './nasa.endpoints';
import { INasaApodDTO } from '../../interfaces/nasa/INasaApodDTO';
import { NasaApod } from '../../entities/nasa/nasaApod';

export class NasaService {

	private static instance: NasaService = null;

	static get Instance() {
		if (NasaService.instance === null) {
			NasaService.instance = new NasaService();
		}
		return NasaService.instance;
	}

	constructor() {
		Urls.endpointsCollection(nasaEndpoints);
	}

	public async getApod(): Promise<NasaApod> {
		let apod: NasaApod = new NasaApod();
		await rp(Urls.api(nasaMethods.getApod)).then((apodJson: string) => {
			let apodDTO: INasaApodDTO = JSON.parse(apodJson);
			apod.date = apodDTO.date;
			apod.explanation = apodDTO.explanation;
			apod.hdurl = apodDTO.hdurl;
			apod.media_type = apodDTO.media_type;
			apod.service_version = apodDTO.service_version;
			apod.title = apodDTO.title;
			apod.url = apodDTO.url;
			console.log(apodDTO);
		});
		return apod;
	}
}

export default NasaService.Instance;