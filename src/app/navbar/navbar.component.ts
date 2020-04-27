import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarSearchResultService } from '../Services/navbarSearchResultService.service';
import { AuthenticationService } from '../_services';
import { User } from '../_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutMessageModalComponent } from '../Modals/logout-message-modal/logout-message-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  navbarInputSearchValue;
  @ViewChild('inputValRef', {static: false}) inputValRef: ElementRef;

  currentUserSubscription;
  currentUser: User;


  constructor(private navbarSearchService: NavbarSearchResultService,
              public router: Router,
              private authenticationService: AuthenticationService,
              private modalService: NgbModal) {

            this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
              this.currentUser = user;
            });

  }

  inputValueEntered(valueEntered) {
    console.log('You entered:', valueEntered.target.value);
    this.navbarInputSearchValue = valueEntered.target.value.toUpperCase();
    this.navbarSearchService.navResultSubject.next(this.navbarInputSearchValue);
  }

  ngOnInit() {
    console.log('current user details: ', this.currentUser);
  }


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onClickFireSearch(inputValRef: HTMLInputElement) {
    console.log('value after button click: ' + inputValRef.value);
    this.navbarInputSearchValue = inputValRef.value.toUpperCase();
    this.navbarSearchService.navResultSubject.next(this.navbarInputSearchValue);
  }

  openLogoutModal() {
    const modalRef = this.modalService.open(LogoutMessageModalComponent);
    modalRef.componentInstance.usersFullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
    modalRef.componentInstance.logoutMessage = 'You are now signed in to your account.';
  }

}
