import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorsExternsComponent } from './sensors-externs.component';

describe('SensorsExternsComponent', () => {
  let component: SensorsExternsComponent;
  let fixture: ComponentFixture<SensorsExternsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorsExternsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SensorsExternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
