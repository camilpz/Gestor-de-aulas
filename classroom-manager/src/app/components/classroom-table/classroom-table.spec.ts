import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomTable } from './classroom-table';

describe('ClassroomTable', () => {
  let component: ClassroomTable;
  let fixture: ComponentFixture<ClassroomTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
