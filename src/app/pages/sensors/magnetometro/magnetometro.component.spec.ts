import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnetometroComponent } from './magnetometro.component';

describe('MagnetometroComponent', () => {
  let component: MagnetometroComponent;
  let fixture: ComponentFixture<MagnetometroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagnetometroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagnetometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
