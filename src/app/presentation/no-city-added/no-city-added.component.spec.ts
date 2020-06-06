import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCityAddedComponent } from './no-city-added.component';

describe('NoCityAddedComponent', () => {
  let component: NoCityAddedComponent;
  let fixture: ComponentFixture<NoCityAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoCityAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoCityAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
