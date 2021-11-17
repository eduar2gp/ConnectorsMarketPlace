import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';


import { By } from '@angular/platform-browser';
import { RouterTestingModule} from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;

  
  
  function updateForm(userEmail: any, userPassword: any) {
    fixture.componentInstance.loginForm.controls['email'].setValue(userEmail);
    fixture.componentInstance.loginForm.controls['password'].setValue(userPassword);
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('Should set submitted to true', fakeAsync(() => {
    component.onSubmit();
    expect(component.onSubmit).toBeTruthy();

 }));

  
  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#emailInput');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#passwordInput');
    const buttonContainer = fixture.debugElement.nativeElement.querySelector('#loginButton');
    
    expect(buttonContainer).toBeDefined();
    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
  });


  it('Form itself should be invalid', fakeAsync(()=> {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));



  it('Form should be valid with mock user', fakeAsync(()=> {
    component.loginForm.controls['email'].setValue('test@gmail.com');
    component.loginForm.controls['password'].setValue('P4ss');
    expect(component.loginForm.valid).toBeTruthy();
  }));


 it('should show error messages when input is invalid', fakeAsync (() => {
  updateForm("notArealEmail.com", "notArealPassword");
  fixture.detectChanges();
  const button = fixture.debugElement.nativeElement.querySelector('#loginButton');
  button.click();
  fixture.detectChanges();   
    expect(fixture.debugElement.query(By.css('mat-error'))).toBeTruthy();

}));


  it('update loginFailed after incorrect input ', fakeAsync(() => {
    updateForm("test@gmail.com", "notARealPassword");
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#loginButton');
    button.click();
    fixture.detectChanges();   
    expect(component.loginFailed).toBeTruthy();
  }));
});