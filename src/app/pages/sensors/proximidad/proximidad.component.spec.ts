import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximidadComponent } from './proximidad.component';

describe('ProximidadComponent', () => {
  let component: ProximidadComponent;
  let fixture: ComponentFixture<ProximidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProximidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
