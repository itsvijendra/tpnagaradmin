import { TPNagarAdminPage } from './app.po';

describe('tpnagar-admin App', () => {
  let page: TPNagarAdminPage;

  beforeEach(() => {
    page = new TPNagarAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
