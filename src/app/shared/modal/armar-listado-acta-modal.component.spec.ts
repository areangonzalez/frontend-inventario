import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmarListadoActaModalComponent } from './armar-listado-acta-modal.component';

describe('ArmarListadoActaModalComponent', () => {
  let component: ArmarListadoActaModalComponent;
  let fixture: ComponentFixture<ArmarListadoActaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArmarListadoActaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmarListadoActaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
