import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIngresoComponent } from './lista-ingreso.component';

describe('ListaIngresoComponent', () => {
  let component: ListaIngresoComponent;
  let fixture: ComponentFixture<ListaIngresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaIngresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
