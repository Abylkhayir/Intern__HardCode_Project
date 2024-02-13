import { Component } from '@angular/core';
import { AuthService } from '../../authorization/authorization.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  toggleButtons: boolean[] = new Array(8).fill(true);

  menu: any[] = [
    {
      path: 'helmet',
      icon: 'assets/img/icon/helmet.svg',
      title: 'Выдача фонарей',
    },
    {
      path: 'personal',
      icon: 'assets/img/icon/twoman.svg',
      title: 'Персонал',
    },
    {
      path: '/ratio-list',
      icon: 'assets/img/icon/ratio.svg',
      title: 'Рации',
    },
    {
      path: 'repair',
      icon: 'assets/img/icon/repair.svg',
      title: 'Ремонт фонарей',
    },
    {
      path: 'tabel',
      icon: 'assets/img/icon/table.svg',
      title: 'Табель',
    },
    {
      path: 'structure',
      icon: 'assets/img/icon/structure.svg',
      title: 'Оргструктура',
    },
  ];
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
  }
}
