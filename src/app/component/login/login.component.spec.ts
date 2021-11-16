import { HttpClientModule } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';

import { By } from '@angular/platform-browser';
import { RouterTestingModule} from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;
  let loginSpy;
  
  
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


  it('Form should be invalid', fakeAsync(()=> {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));



  it('Form should be valid', fakeAsync(()=> {
    component.loginForm.controls['email'].setValue('test@gmail.com');
    component.loginForm.controls['password'].setValue('P4ss');
    expect(component.loginForm.valid).toBeTruthy();
  }));


  it('update loginFailed after input ', fakeAsync(() => {
    updateForm("test@gmail.com", "P4ss");
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('#loginButton');
    button.click();
    fixture.detectChanges();   
    expect(component.loginFailed).toBeFalsy();
  }));


//this test does nothing, obviously.  Need to fix.
  it('should not show error message when input is valid', fakeAsync (() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const messages = compiled.querySelector('#message');
    expect(messages).toBeFalsy();
 }));



 it('should show error messages when input is invalid', fakeAsync (() => {
    expect(fixture.debugElement.query(By.css('mat-error'))).toBeTruthy();

}));


});
