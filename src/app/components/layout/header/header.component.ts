import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  faSignInAlt,
  faUserPlus,
  faUser,
  faFilter,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;
  faUser = faUser;
  faFilter = faFilter;
  faCaretDown = faCaretDown;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToHome() {
    this.router.navigateByUrl('');
  }
}
