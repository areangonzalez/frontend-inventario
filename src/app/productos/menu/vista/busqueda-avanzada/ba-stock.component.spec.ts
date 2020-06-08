import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaStockComponent } from './ba-stock.component';

describe('BaStockComponent', () => {
  let component: BaStockComponent;
  let fixture: ComponentFixture<BaStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
