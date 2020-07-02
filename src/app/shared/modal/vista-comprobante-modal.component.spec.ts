import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaComprobanteModalComponent } from './vista-comprobante-modal.component';

describe('VistaComprobanteModalComponent', () => {
  let component: VistaComprobanteModalComponent;
  let fixture: ComponentFixture<VistaComprobanteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaComprobanteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaComprobanteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
