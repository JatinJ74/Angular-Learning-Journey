import { Component } from '@angular/core';
import { AbstractControl, Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function equalValues(controlName1: string, controlName2: string){
  return (control: AbstractControl) => {
    const val1 = control.get('controlName1')?.value;
    const val2 = control.get('controlName2')?.value;

    if(val1 === val2){
      return null;
    }
    return { 'valuesNotEqual': true };
  };
}


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),

    passwords: new FormGroup({
      password: new FormControl('',{
        validators: [Validators.minLength(8), Validators.required]
      }),
      confirmPassword: new FormControl('',{
        validators: [Validators.required, Validators.minLength(8)]
      }),
    }, {
      validators: [equalValues('password','confirmPassword')],
    }),

    firstName: new FormControl(''),
    lastName: new FormControl(''),

    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      postalCode: new FormControl(''),
      number: new FormControl(''),
    }),

    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    
    role: new FormControl<'student' | 'employee' | 'teacher' | 'founder' | 'other'>('student', {
      validators: [Validators.required]}),

    agree: new FormControl(false, {validators: [Validators.required]})
  });

  onSubmit() {
    console.log("INVALID FORM");
    // console.log(this.form.controls.email);
    // console.log(this.form.controls.password);
    this.form.reset();
    }
  
  onReset(){
    this.form.reset();
  }
  
}
