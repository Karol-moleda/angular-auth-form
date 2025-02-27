import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  standalone: true
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  onLogin() {
    this.router.navigate(['/login']);
  }

}
