import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinpageComponent } from './coinpage.component';

describe('CoinpageComponent', () => {
  let component: CoinpageComponent;
  let fixture: ComponentFixture<CoinpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
