import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobanteModalComponent } from './comprobante-modal.component';

describe('ComprobanteModalComponent', () => {
  let component: ComprobanteModalComponent;
  let fixture: ComponentFixture<ComprobanteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprobanteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprobanteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
