import { UserAccess } from 'app/model/useraccess';
export class User {
    constructor(
		public UserName?: string,
		public UserEmail?: string,
		public Password?: string,
		public IsValidUser?: string,
		public UserRole?: boolean,
		public CityList?: string,
		public userAccess?: UserAccess[],
		public token? : string,
		public getUserPermissions? : boolean
	) {}
}
