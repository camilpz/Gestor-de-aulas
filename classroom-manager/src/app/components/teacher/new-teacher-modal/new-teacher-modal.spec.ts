import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTeacherModal } from './new-teacher-modal';

describe('NewTeacherModal', () => {
  let component: NewTeacherModal;
  let fixture: ComponentFixture<NewTeacherModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTeacherModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTeacherModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
