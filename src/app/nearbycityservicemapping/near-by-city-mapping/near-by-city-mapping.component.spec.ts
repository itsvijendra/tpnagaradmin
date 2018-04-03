import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearByCityMappingComponent } from './near-by-city-mapping.component';

describe('NearByCityMappingComponent', () => {
  let component: NearByCityMappingComponent;
  let fixture: ComponentFixture<NearByCityMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearByCityMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearByCityMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
