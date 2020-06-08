import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaIngresoComponent } from './ba-ingreso.component';

describe('BaIngresoComponent', () => {
  let component: BaIngresoComponent;
  let fixture: ComponentFixture<BaIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
