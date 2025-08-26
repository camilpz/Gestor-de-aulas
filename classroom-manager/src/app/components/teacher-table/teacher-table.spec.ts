import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherTable } from './teacher-table';

describe('TeacherTable', () => {
  let component: TeacherTable;
  let fixture: ComponentFixture<TeacherTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
