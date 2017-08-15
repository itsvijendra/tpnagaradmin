import { CompanyServiceDestination } from './companyservicedestination'
export class Service {
     constructor(
        public CompanyId?: number,
        public ServiceId?: number,
		public ServiceName?: string,
		public ServiceDesc?: string,
        public IsApproved?: boolean,
        public Destinations?: CompanyServiceDestination[],
        public CompanyName? : string,
        public ServiceTypeId? : number
    ) {}
}
