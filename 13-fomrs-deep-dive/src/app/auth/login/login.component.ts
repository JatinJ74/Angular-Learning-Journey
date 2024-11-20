import { JsonPipe } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, OnInit, viewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

function mustContainQuestionMark(control : AbstractControl){
  if(control.value && !control.value.includes('?')){
    return { 'mustContainQuestionMark' : true };
  }
  return null;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  private destroyRef = inject(DestroyRef);

    form = new FormGroup({
      username: new FormControl('',{
        validators : [Validators.email, Validators.required],
      }),
      password: new FormControl('',{
        validators: [Validators.required, Validators.minLength(8), mustContainQuestionMark]
      }),
    });

    get emailInvalid(){
      return (this.form.controls.username.touched &&
      this.form.controls.username.invalid &&
      this.form.controls.username.dirty);
    }

    get passwordInvalid(){
      return (this.form.controls.password.touched &&
      this.form.controls.password.invalid &&
      this.form.controls.password.dirty);
    }

    ngOnInit() {
      const savedForm = window.localStorage.getItem('username');

      if(savedForm){
        const loadedForm = JSON.parse(savedForm);
        this.form.patchValue({
          username: loadedForm.username,
        });
      }



     const subscription = this.form.valueChanges
     .pipe(
      debounceTime(500))
     .subscribe({
        next(value) {
          window.localStorage.setItem( 
            'username', 
            JSON.stringify({username: value.username})
          );
        },
       });

      this.destroyRef.onDestroy( () =>
        subscription.unsubscribe()
      );
    }

    onSubmit(){
      console.log(this.form);
    }

    

  // private form = viewChild.required<NgForm>('form');
  // private destroyRef = inject(DestroyRef);


  // constructor(){
  //   afterNextRender(() => {
  //     const savedFrom = window.localStorage.getItem('saved-login-form');
      
  //     if(savedFrom){
  //       const loadFormData = JSON.parse(savedFrom);
  //       const savedEmail = loadFormData.email;
  //       setTimeout(() => {
  //            this.form().controls['email'].setValue(savedEmail); 
  //       }, 1);
  //    }

  //     const subscription = this.form().valueChanges
  //     ?.pipe(
  //       debounceTime(500)
  //     ).subscribe({
  //       next: (value) => {
  //         window.localStorage.setItem(
  //           'saved-login-form',
  //           JSON.stringify({email: value.email})
  //         )
  //       }
  //     });

  //     this.destroyRef.onDestroy(
  //       () => { subscription?.unsubscribe()}
  //     );
      
  //   })
  // }

  // onSubmit(formData: NgForm){
  
  // // if(formData.form.invalid){
  // //   console.log('Invalid form');
  // // }else{
  // //   console.log("valid form");
  // // }
  //  const enteredEmail = formData.form.value.email;
  //  const enteredPassword = formData.form.value.password;
  //  console.log(enteredEmail,enteredPassword);

  //  formData.form.reset();
  // }
}
