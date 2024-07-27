import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLiteratureComponent } from './list-of-literature.component';

describe('ListOfLiteratureComponent', () => {
  let component: ListOfLiteratureComponent;
  let fixture: ComponentFixture<ListOfLiteratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfLiteratureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfLiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
