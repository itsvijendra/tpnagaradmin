import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerConfigDetailComponent } from './banner-config-detail.component';

describe('BannerConfigDetailComponent', () => {
  let component: BannerConfigDetailComponent;
  let fixture: ComponentFixture<BannerConfigDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerConfigDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerConfigDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
