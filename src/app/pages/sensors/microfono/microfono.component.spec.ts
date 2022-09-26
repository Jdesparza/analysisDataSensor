import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrofonoComponent } from './microfono.component';

describe('MicrofonoComponent', () => {
  let component: MicrofonoComponent;
  let fixture: ComponentFixture<MicrofonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrofonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicrofonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
