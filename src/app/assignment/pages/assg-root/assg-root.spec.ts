import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgRoot } from './assg-root';

describe('AssgRoot', () => {
  let component: AssgRoot;
  let fixture: ComponentFixture<AssgRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssgRoot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssgRoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
