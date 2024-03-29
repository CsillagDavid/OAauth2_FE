import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPageComponent } from './logout-page.component';

describe('LogoutComponent', () => {
  let component: LogoutPageComponent;
  let fixture: ComponentFixture<LogoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
