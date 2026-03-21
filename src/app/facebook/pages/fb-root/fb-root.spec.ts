import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbRoot } from './fb-root';

describe('FbRoot', () => {
  let component: FbRoot;
  let fixture: ComponentFixture<FbRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FbRoot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FbRoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
