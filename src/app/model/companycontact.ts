export class CompanyContact {
    constructor(
		public Id?: number,
		public CompanyId?: number,
		public ContactNo?: string,
        public ContactType?: string,
        public IsPrimary?: boolean,
        public IsActive?: boolean    
	) {}
}
