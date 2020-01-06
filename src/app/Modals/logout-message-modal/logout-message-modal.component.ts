import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-message-modal',
  templateUrl: './logout-message-modal.component.html',
  styleUrls: ['./logout-message-modal.component.scss']
})
export class LogoutMessageModalComponent implements OnInit {
  @Input() logoutMessage;
  @Input() usersFullName;

  constructor(public activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    this.activeModal.close();
  }

}
