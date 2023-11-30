import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  ngOnInit() {

    (this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      user_id: ['', Validators.required],
    })),
      { validator: this.passwordMatchValidator };
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      user_id: ['', Validators.required],
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password!.value !== confirmPassword!.value) {
      confirmPassword!.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }

  onSubmit() {
    // console.log(this.resetPasswordForm.value);

    if (this.resetPasswordForm.valid) {
      const { confirmPassword, ...userDetails } = this.resetPasswordForm.value;

      this.userService
        .resetPassword(userDetails)
        .then((response) => {
          if (response.message) {
            Swal.fire({
              icon: 'success',
              title: 'You have updated password Successfully',
              text: `${response.message}`,
              didRender: () => {
                const successMessage = document.querySelector('.swal2-title');
                successMessage!.setAttribute('data-cy', 'reset-success-popup');
              },
            });
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
          if (response.error) {
            Swal.fire({
              icon: 'error',
              title: 'Please try Again',
              text: `${response.error}`,
              didRender: () => {
                const errorMessage = document.querySelector('.swal2-title');
                errorMessage!.setAttribute('data-cy', 'reset-error-popup');
              },
            });
            setTimeout(() => {
              this.resetPasswordForm.reset();
            }, 5000);
          }
        })
        .catch((error) => {
          // Handle errors
          console.log(error);
        });
    }
  }
}
