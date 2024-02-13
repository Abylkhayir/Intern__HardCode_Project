import { Component } from '@angular/core';
import { AuthService } from '../../authorization/authorization.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	standalone: true,
	imports: [CommonModule]
	})
	export class HeaderComponent {
		toggleButtons: boolean[] = new Array(8).fill(true);
			constructor(private AuthService: AuthService, private router: Router) {}
	enableDisableRule(index: number) {
		this.toggleButtons[index] = !this.toggleButtons[index]; // Изменяем состояние выбранной кнопки по индексу
	 }
	logout() {
		this.AuthService.logout();
	}
}
