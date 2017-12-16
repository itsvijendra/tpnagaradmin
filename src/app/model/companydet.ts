import { CompanyContact } from '../model/companycontact';
import { Service } from '../model/service';
export class CompanyDet {
    constructor(
		public CompanyId?: number,
		public CompanyName?: string,
        public CompanyDesc?: string,
        public OwnerName?: string,
        public ContactPerson?: string, 
        public ContactDet?: CompanyContact[],      
		public Address?: string,
        public FaxNo?: string,
        public CountryId?: number,
        public CountryName?: string,        
        public StateId?: number,
        public StateName?: string,        
        public CityId?: number,
        public CityName?: string,
        public AreaId?: number,
        public AreaName?: string,
        public Website?: string,
        public PinCode?: string,
        public CompanyTypeId?: number,
        public CompanyType?: string,
        public CurrentStatusId?: string,
        public ServiceType?: string,
        public CreatedOn?: Date,
        public CreatedBy?: string,
        public ModifiedOn?: Date,
        public ModifiedBy?: string,
        public AppSource?: string,
        public Services?: Service[],
        public ParentId?: number,
        public BranchName?: string
	) {}
}
