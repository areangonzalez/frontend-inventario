import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevuelveProductoModalComponent } from './devuelve-producto-modal.component';

describe('DevuelveProductoModalComponent', () => {
  let component: DevuelveProductoModalComponent;
  let fixture: ComponentFixture<DevuelveProductoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevuelveProductoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevuelveProductoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
