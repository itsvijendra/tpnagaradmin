import { Destination } from 'app/model/Destination';
export class CompService {
     constructor(
        public CompanyId?: number,
        public ServiceId?: number,
		public ServiceName?: string,
		public ServiceDesc?: string,
        public Destinations?: Destination[],
        public CompanyName? : string,
        public ServiceTypeId? : number
    ) {}
}
