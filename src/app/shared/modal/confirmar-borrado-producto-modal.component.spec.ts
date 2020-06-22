import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarBorradoProductoModalComponent } from './confirmar-borrado-producto-modal.component';

describe('ConfirmarBorradoProductoModalComponent', () => {
  let component: ConfirmarBorradoProductoModalComponent;
  let fixture: ComponentFixture<ConfirmarBorradoProductoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarBorradoProductoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarBorradoProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
