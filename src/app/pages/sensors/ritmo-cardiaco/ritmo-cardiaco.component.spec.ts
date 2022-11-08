import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RitmoCardiacoComponent } from './ritmo-cardiaco.component';

describe('RitmoCardiacoComponent', () => {
  let component: RitmoCardiacoComponent;
  let fixture: ComponentFixture<RitmoCardiacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RitmoCardiacoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RitmoCardiacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
