import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLiteratureComponent } from './main-literature.component';

describe('MainLiteratureComponent', () => {
  let component: MainLiteratureComponent;
  let fixture: ComponentFixture<MainLiteratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLiteratureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
