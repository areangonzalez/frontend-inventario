import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDefectuosoModalComponent } from './producto-defectuoso-modal.component';

describe('ProductoDefectuosoModalComponent', () => {
  let component: ProductoDefectuosoModalComponent;
  let fixture: ComponentFixture<ProductoDefectuosoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoDefectuosoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDefectuosoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
