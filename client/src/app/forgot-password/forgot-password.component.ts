import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit = () => {
    if (this.forgotForm.valid) {
      this.userService.forgotPassword(this.forgotForm.value).then(
        (res) => {
          // console.log(res);

          if (res.message) {
            Swal.fire({
              title: 'Success!',
              text: `${res.message}`,
              icon: 'success',
              confirmButtonText: 'Ok',
              didRender: () => {
                const successMessage = document.querySelector('.swal2-title');
                successMessage!.setAttribute('data-cy', 'forgot-success-popup');
              },
            }).then((result) => {
              this.router.navigate(['/reset']);

              this.forgotForm.reset();
            });
          }

          if (res.error) {
            Swal.fire({
              title: 'Error!',
              text: `${res.error}`,
              icon: 'error',
              confirmButtonText: 'Ok',
              didRender: () => {
                const errorMessage = document.querySelector('.swal2-title');
                errorMessage!.setAttribute('data-cy', 'forgot-error-popup');
              },
            }).then((result) => {
              this.forgotForm.reset();
            });
          }
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'Ok',
          }).then((result) => {
            this.forgotForm.reset();
          });
        }
      );
    }
  };
}
