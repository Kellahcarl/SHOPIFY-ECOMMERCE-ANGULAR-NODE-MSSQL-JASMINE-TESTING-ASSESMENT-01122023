import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    // Call your login service with the form data
    this.loginService
      .loginUser(this.loginForm.value)
      .then((response) => {
        // Handle successful login
        // console.log(response);

        if (response.message) {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }

          Swal.fire({
            icon: 'success',
            title: 'You have Logged In Successfully',
            text: `${response.message}`,
            timer: 2000,
          });

          this.loginService.checkUserDetails(response.token).then((data) => {
            // console.log(data);

            if ('info' in data) {
              if (data.info.isAdmin === true) {
                localStorage.setItem('fullName', data.info.fullName!);
                localStorage.setItem('user_id', data.info.id);
                localStorage.setItem('isAdmin', 'true');
                this.router.navigate(['/admin']);
              } else if (data.info.isAdmin === false) {
                localStorage.setItem('isAdmin', 'false');
                localStorage.setItem('fullName', data.info.fullName!);
                localStorage.setItem('user_id', data.info.id);
                this.router.navigate(['/user']);
              }
            }
          });
          setTimeout(() => {
            // this.router.navigate(['/'])
          }, 5000);
        }
        if (response.error) {
          Swal.fire({
            icon: 'error',
            title: 'Please try Again',
            text: `${response.error}`,
          });
          setTimeout(() => {
            this.loginForm.reset();
          }, 5000);
        }
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });
  }
}
