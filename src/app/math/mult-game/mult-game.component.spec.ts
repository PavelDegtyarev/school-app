import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultGameComponent } from './mult-game.component';

describe('MultGameComponent', () => {
  let component: MultGameComponent;
  let fixture: ComponentFixture<MultGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
