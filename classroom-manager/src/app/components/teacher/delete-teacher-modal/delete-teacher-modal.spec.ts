import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeacherModal } from './delete-teacher-modal';

describe('DeleteTeacherModal', () => {
  let component: DeleteTeacherModal;
  let fixture: ComponentFixture<DeleteTeacherModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteTeacherModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTeacherModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
