import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaEgresoComponent } from './ba-egreso.component';

describe('BaEgresoComponent', () => {
  let component: BaEgresoComponent;
  let fixture: ComponentFixture<BaEgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaEgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
