export class Banner {
    constructor(
		public BannerId?: number,
		public BannerName?: string,
		public BannerSize?: string,
        public BannerUrl?: string,
        public BannerRedirectUrl?: string,
        public BannerStartDate?: Date,
        public BannerEndDate?: Date,
        public IsActive?: boolean
	) {}
}
