import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { LoginComponent } from './login.component';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
      ],
      declarations: [ LoginComponent ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe retornar formulario invalido', () => {
    const email = component.formLogin.controls['email'];
    email.setValue('example@gmail.com');

    expect(component.formLogin.invalid).toBeTrue();
  });

  it('Debe retornar formulario valido', () => {
    let email = component.formLogin.controls['email'];
    let password = component.formLogin.controls['password'];
    email.setValue('example@gmail.com');
    password.setValue('123456');

    expect(component.formLogin.invalid).toBeFalse();
  });

  it('Iniciar sesion con datos validos', (done: DoneFn) => {
    let email = component.formLogin.controls['email'];
    let password = component.formLogin.controls['password'];
    email.setValue('admin@admin.com');
    password.setValue('adminUTPLdatasensor');

    component.servicio.login(component.formLogin.value).then(response => {
      expect(response['user']['email']).toEqual(email.value);
      done()
    })
    
  });
});
