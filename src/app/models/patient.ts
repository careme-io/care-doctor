export class Patient{
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public age: number,
		public phone: string,
		public location: string,
		public lat: number,
		public lon: number
	){}
}