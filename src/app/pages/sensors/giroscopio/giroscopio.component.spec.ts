import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiroscopioComponent } from './giroscopio.component';

describe('GiroscopioComponent', () => {
  let component: GiroscopioComponent;
  let fixture: ComponentFixture<GiroscopioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiroscopioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiroscopioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
