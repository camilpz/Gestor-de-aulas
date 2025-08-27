import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeacherModal } from './edit-teacher-modal';

describe('EditTeacherModal', () => {
  let component: EditTeacherModal;
  let fixture: ComponentFixture<EditTeacherModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTeacherModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTeacherModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
