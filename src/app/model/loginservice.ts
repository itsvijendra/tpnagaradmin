export class LoginServices {
     constructor(
        public LoginId? : number,
        public CompanyId?: number,
        public CompanyName?: string,
        public LoginEmail? : string,
        public LoginPhone? : string,
        public LoginStatusName? : string,
        public BrokerSearchEnabled?: boolean
    ) {}
}
