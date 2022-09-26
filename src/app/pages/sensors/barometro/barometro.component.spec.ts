import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarometroComponent } from './barometro.component';

describe('BarometroComponent', () => {
  let component: BarometroComponent;
  let fixture: ComponentFixture<BarometroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarometroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
