import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClassroomModal } from './new-classroom-modal';

describe('NewClassroomModal', () => {
  let component: NewClassroomModal;
  let fixture: ComponentFixture<NewClassroomModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClassroomModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClassroomModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
