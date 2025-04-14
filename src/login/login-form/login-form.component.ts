import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
    imports: [
        FormsModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
})
export class LoginFormComponent {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        remember: new FormControl(false),
    });
    isError: boolean = false;
    errorMessage: string = '';

    private setError(message: string) {
        this.isError = true;
        this.errorMessage = message;
    }
    
    private clearError() {
        this.isError = false;
        this.errorMessage = '';
    }

    onSubmit() {
        const { username, password } = this.loginForm.controls;
        const usernameValue = username.value ?? '';
        const passwordValue = password.value ?? '';
        if (!this.loginForm.valid) {
            this.setError("Please enter your username and password.");
            return;
        }
        if (this.checkValidCredentials(usernameValue, passwordValue)) {
            console.log("login");
        } else {
            this.setError("Incorrect Credentials.");
            return;
        }
        this.clearError();
    }

    checkValidCredentials(username: string, password: string): boolean {
        // TODO: link this to the db
        return username === 'admin' && password === 'admin';
    }
}