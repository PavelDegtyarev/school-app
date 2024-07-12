import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteratureComponent } from './literature.component';

describe('LiteratureComponent', () => {
  let component: LiteratureComponent;
  let fixture: ComponentFixture<LiteratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiteratureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
