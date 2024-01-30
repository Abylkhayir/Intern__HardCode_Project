import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent {
  constructor(private router: Router) {}

  redirectToPage2() {
    this.router.navigate(['/страница2']);
  }
}
