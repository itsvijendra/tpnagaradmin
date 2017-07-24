export class Company {
    constructor(
		public CompanyId?: number,
		public CompanyName?: string,
		public ContactNo?: string,
        public Services?: string,
        public StateId?: string,
        public StateName?: string,
        public CityId?: number,
        public CityName?: string,
        public CompanyType?:string,
        public IsTPNagarApproved? :boolean
	) {}
}
