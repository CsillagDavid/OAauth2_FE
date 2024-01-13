import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationGrantPageComponent } from './authorization-grant-page.component';

describe('AuthorizationGrantPageComponent', () => {
  let component: AuthorizationGrantPageComponent;
  let fixture: ComponentFixture<AuthorizationGrantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizationGrantPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizationGrantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
