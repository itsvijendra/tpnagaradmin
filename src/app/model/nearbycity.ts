export class NearByCity {
     constructor(       
        public CityId?: number,
        public NearByCityId?: number,
        public NearByCityName?: string,
        public IsBroker?: boolean,
        public IsContractor?: boolean,
        public IsSelected?: boolean,
        public BrokerSeqNo?: number,
        public ContractorSeqNo?: number
    ) {}
}
