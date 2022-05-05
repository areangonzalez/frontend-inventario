import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvedorListaComponent } from './provedor-lista.component';

describe('ProvedorListaComponent', () => {
  let component: ProvedorListaComponent;
  let fixture: ComponentFixture<ProvedorListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvedorListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvedorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
