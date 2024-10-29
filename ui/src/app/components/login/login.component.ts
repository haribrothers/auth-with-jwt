import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            formControlName="username"
            class="form-control"
            [ngClass]="{'is-invalid': submitted && f['username'].errors}"
          />
          <div *ngIf="submitted && f['username'].errors" class="error-message">
            <div *ngIf="f['username'].errors['required']">Username is required</div>
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            formControlName="password"
            class="form-control"
            [ngClass]="{'is-invalid': submitted && f['password'].errors}"
          />
          <div *ngIf="submitted && f['password'].errors" class="error-message">
            <div *ngIf="f['password'].errors['required']">Password is required</div>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary">Login</button>
        </div>

        <div *ngIf="error" class="error-message">
          {{ error }}
        </div>
      </form>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.f['username'].value, this.f['password'].value)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: error => {
          this.error = 'Invalid credentials';
        }
      });
  }
}