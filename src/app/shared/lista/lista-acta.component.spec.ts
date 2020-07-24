import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaActaComponent } from './lista-acta.component';

describe('ListaActaComponent', () => {
  let component: ListaActaComponent;
  let fixture: ComponentFixture<ListaActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
