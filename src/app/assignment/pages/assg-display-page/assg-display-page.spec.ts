import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgDisplayPage } from './assg-display-page';

describe('AssgDisplayPage', () => {
  let component: AssgDisplayPage;
  let fixture: ComponentFixture<AssgDisplayPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssgDisplayPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssgDisplayPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
