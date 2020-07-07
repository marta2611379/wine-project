import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WineAboutComponent } from './wine-about.component';

describe('WineAboutComponent', () => {
  let component: WineAboutComponent;
  let fixture: ComponentFixture<WineAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
