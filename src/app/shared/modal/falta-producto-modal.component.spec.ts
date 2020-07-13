import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaltaProductoModalComponent } from './falta-producto-modal.component';

describe('FaltaProductoModalComponent', () => {
  let component: FaltaProductoModalComponent;
  let fixture: ComponentFixture<FaltaProductoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaltaProductoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaltaProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
