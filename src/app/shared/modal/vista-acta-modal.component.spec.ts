import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaActaModalComponent } from './vista-acta-modal.component';

describe('VistaActaModalComponent', () => {
  let component: VistaActaModalComponent;
  let fixture: ComponentFixture<VistaActaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaActaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaActaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
