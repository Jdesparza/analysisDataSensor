import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodometroComponent } from './podometro.component';

describe('PodometroComponent', () => {
  let component: PodometroComponent;
  let fixture: ComponentFixture<PodometroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodometroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
