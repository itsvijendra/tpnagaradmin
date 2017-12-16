export class Destination {
     constructor(
        public Id?: number,
        public CompanyServiceId?: number,
		public ToState?: number,
		public ToCity?: number,
        public IsActive?: boolean,
        public CreatedBy?: string,
        public CreatedOn?: Date,
        public ModifiedBy?: string,
        public ModifiedOn?: Date,
        public ServiceTypeId? : number,
        public ToStateName? : string,
        public ToCityName? : string
    ) {}
}
