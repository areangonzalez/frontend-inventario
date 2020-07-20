import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEgresoComponent } from './lista-egreso.component';

describe('ListaEgresoComponent', () => {
  let component: ListaEgresoComponent;
  let fixture: ComponentFixture<ListaEgresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEgresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
