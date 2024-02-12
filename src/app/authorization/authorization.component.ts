import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './authorization.service';
import { CyrillicValidator } from './CyrillicValidator.component';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  loginForm: FormGroup;
  loginErrorType: number;
  passwordError: boolean = false;

  get isFormInvalid(): boolean {
    this.router.navigate['ratio-page'];
    return this.loginForm.invalid;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, CyrillicValidator()]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.isFormInvalid) {
      return;
    }

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService.authenticate(username, password).subscribe(
      (response) => {
        const token = response.token;
        this.authService.setToken(token);
        this.router.navigate(['pages']);
      },
      (error) => {
        console.error('Authentication error:', error);
      }
    );
  }
}
