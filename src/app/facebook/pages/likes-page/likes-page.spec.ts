import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesPage } from './likes-page';

describe('LikesPage', () => {
  let component: LikesPage;
  let fixture: ComponentFixture<LikesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
