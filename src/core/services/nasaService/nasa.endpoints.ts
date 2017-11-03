import { Endpoint } from '../../entities/common/endpoint';
import { NASA_API_KEY } from '../../../app.settings';

export const nasaMethods = {
	getApod:'getApod'
}

export const nasaEndpoints: Endpoint[] = [
	new Endpoint(nasaMethods.getApod, false, () => {
		return `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
	})
];