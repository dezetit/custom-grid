import { AppPage } from './app.po';

describe('custom-grid App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display the title', () => {
    expect(page.getTitleText()).toEqual('List View');
  });
});
