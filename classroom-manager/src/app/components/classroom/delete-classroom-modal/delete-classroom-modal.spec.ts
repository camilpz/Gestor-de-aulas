import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClassroomModal } from './delete-classroom-modal';

describe('DeleteClassroomModal', () => {
  let component: DeleteClassroomModal;
  let fixture: ComponentFixture<DeleteClassroomModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteClassroomModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteClassroomModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
