import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFromListComponent } from './book-from-list.component';

describe('BookFromListComponent', () => {
  let component: BookFromListComponent;
  let fixture: ComponentFixture<BookFromListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookFromListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookFromListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
