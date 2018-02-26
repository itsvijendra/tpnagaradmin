import { CompanyServiceDestination } from './companyservicedestination'
import { Destination } from 'app/model/Destination';
export class Service {
     constructor(
        public CompanyId?: number,
        public ServiceId?: number,
		public ServiceName?: string,
		public ServiceDesc?: string,
        public Destinations?: CompanyServiceDestination[],
        public CompanyName? : string,
        public ServiceTypeId? : number,
        public Destination?: Destination[],
        public HasDestination? : boolean,
        public IsActive? : boolean
    ) {}
}
