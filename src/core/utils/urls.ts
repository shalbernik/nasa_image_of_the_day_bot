import { Endpoint } from '../entities/common/endpoint';

export class Urls {
	public endpoints: { [id: string]: Endpoint; } = {};

	private static instance: Urls = null;

	static get Instance() {
		if (Urls.instance === null) {
			Urls.instance = new Urls();
		}
		return Urls.instance;
	}

	public api(key, ...args: any[]) {
		let endpoint = this.endpoints[key];
		if (endpoint) {
			let endpointUrl = endpoint.combineUrl.apply( {}, args);

			return endpoint.isMocked ? endpoint.mockUrl.apply( {}, args) : `${endpointUrl}`;
		}
		throw new Error(`There is no endpoint by ${key} key. Check key name or add one.`);
	}

	public endpoint(endpoint: Endpoint) {
		if (this.endpoints[endpoint.name]) {
			throw new Error(`You have already declared endpoint URL with the same name. Endpoint: ${endpoint.name}`);
		}

		this.endpoints[endpoint.name] = endpoint;
	}

	public endpointsCollection(endpoints: Endpoint[]) {
		for (const endpoint of endpoints) {
			this.endpoint(endpoint);
		}
	}
}


export default Urls.Instance;