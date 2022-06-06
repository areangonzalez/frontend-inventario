import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaListaComponent } from './marca-lista.component';

describe('MarcaListaComponent', () => {
  let component: MarcaListaComponent;
  let fixture: ComponentFixture<MarcaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
