import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcelerometroComponent } from './acelerometro.component';

describe('AcelerometroComponent', () => {
  let component: AcelerometroComponent;
  let fixture: ComponentFixture<AcelerometroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcelerometroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcelerometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
