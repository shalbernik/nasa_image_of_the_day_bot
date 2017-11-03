export class Endpoint {
	public name: string;
	public isMocked: boolean;
	public combineUrl: (params?: any) => string;
	public mockUrl?: (params?: any) => string;

	constructor(name: string, isMocked: boolean, combineUrl: (params?: any) => string, mockUrl?: (params?: any) => string) {
		this.name = name;
		this.isMocked = isMocked;
		this.combineUrl = combineUrl;
		this.mockUrl = mockUrl;
	}
}