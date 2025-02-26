import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string = 'User';
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if user is logged in by verifying token exists
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = !!token;
    
    // If not logged in, redirect to login page
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
  }

  logout(): void {
    // Clear the authentication token
    localStorage.removeItem('authToken');
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
