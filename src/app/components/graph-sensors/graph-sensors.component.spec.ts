import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSensorsComponent } from './graph-sensors.component';

describe('GraphSensorsComponent', () => {
  let component: GraphSensorsComponent;
  let fixture: ComponentFixture<GraphSensorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphSensorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
