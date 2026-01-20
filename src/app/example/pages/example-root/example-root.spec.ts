import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ExampleRoot } from './example-root';

describe('ExampleRoot', () => {
  let component: ExampleRoot;
  let fixture: ComponentFixture<ExampleRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleRoot],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleRoot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
