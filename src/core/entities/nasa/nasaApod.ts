import { INasaApodDTO } from '../../interfaces/nasa/INasaApodDTO';

export class NasaApod implements INasaApodDTO {
	public date: string;
	public explanation: string;
	public hdurl: string;
	public media_type: string;
	public service_version: string;
	public title: string;
	public url: string;
}