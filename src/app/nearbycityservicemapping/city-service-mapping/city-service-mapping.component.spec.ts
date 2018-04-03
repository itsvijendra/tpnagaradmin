import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityServiceMappingComponent } from './city-service-mapping.component';

describe('CityServiceMappingComponent', () => {
  let component: CityServiceMappingComponent;
  let fixture: ComponentFixture<CityServiceMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityServiceMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityServiceMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
