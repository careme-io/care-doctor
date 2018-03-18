export class Doctor{
	constructor(
		public care_id: number,
		public active: number,
		public doctor_name: string,
		public email: string,
		public password: string,
		public token: string,
		public mobile_numer: number,
		public patients: any
	){}
}