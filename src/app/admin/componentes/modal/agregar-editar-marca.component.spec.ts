import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarMarcaComponent } from './agregar-editar-marca.component';

describe('AgregarEditarMarcaComponent', () => {
  let component: AgregarEditarMarcaComponent;
  let fixture: ComponentFixture<AgregarEditarMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarEditarMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEditarMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
