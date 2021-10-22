import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDescripcionModalComponent } from './editar-descripcion-modal.component';

describe('EditarDescripcionModalComponent', () => {
  let component: EditarDescripcionModalComponent;
  let fixture: ComponentFixture<EditarDescripcionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDescripcionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDescripcionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
