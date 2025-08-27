import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentModal } from './new-student-modal';

describe('NewStudentModal', () => {
  let component: NewStudentModal;
  let fixture: ComponentFixture<NewStudentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStudentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStudentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
