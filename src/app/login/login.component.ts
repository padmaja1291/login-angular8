import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginSharedService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
 

  constructor( private formBuilder: FormBuilder, 
              private loginSharedService: LoginSharedService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

onSubmit() {
  
  console.log('on submit')
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.loginSharedService.loginUser(this.f.username.value, this.f.password.value)
  .subscribe(
    data => {
      console.log('success',data)
      this.loading = false;
      window.location.href = 'http://onecause.com';
  },
  error => {
      console.log('error',error)
      this.error = 'custom error';
      this.loading = false;
  }
  )
  
}

}
