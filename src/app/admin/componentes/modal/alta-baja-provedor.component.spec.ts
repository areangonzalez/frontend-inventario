import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaBajaProvedorComponent } from './alta-baja-provedor.component';

describe('AltaBajaProvedorComponent', () => {
  let component: AltaBajaProvedorComponent;
  let fixture: ComponentFixture<AltaBajaProvedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaBajaProvedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaBajaProvedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
