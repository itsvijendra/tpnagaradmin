export class Banner {
    constructor(
		public BannerId?: number,
		public BannerName?: string,
		public BannerSize?: string,
        public StartDate?: Date,
        public EndDate?: Date,
        public IsActive?: boolean
	) {}
}
