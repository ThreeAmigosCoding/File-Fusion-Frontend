import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInviteComponent } from './member-invite.component';

describe('MemberInviteComponent', () => {
  let component: MemberInviteComponent;
  let fixture: ComponentFixture<MemberInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberInviteComponent]
    });
    fixture = TestBed.createComponent(MemberInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
