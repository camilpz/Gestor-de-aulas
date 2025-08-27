import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudenModal } from './new-studen-modal';

describe('NewStudenModal', () => {
  let component: NewStudenModal;
  let fixture: ComponentFixture<NewStudenModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStudenModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStudenModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
