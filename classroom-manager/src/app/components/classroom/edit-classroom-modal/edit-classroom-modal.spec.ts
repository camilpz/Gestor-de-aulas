import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassroomModal } from './edit-classroom-modal';

describe('EditClassroomModal', () => {
  let component: EditClassroomModal;
  let fixture: ComponentFixture<EditClassroomModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClassroomModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClassroomModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
