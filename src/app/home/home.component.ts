import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FighterCardModalComponent } from '../Modals/fighter-card-modal/fighter-card-modal.component';
import { FetchingDataService } from '../Services/fetchingDataService.service';
import { NavbarSearchResultService } from '../Services/navbarSearchResultService.service';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  myData = [];
  myFilteredData = [];
  navInputSearchValue = '';

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(private fetchingDataService: FetchingDataService,
              private navbarSearchService: NavbarSearchResultService,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) {

              this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                this.currentUser = user;
              });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.loadAllUsers();
    this.fetchingDataService.getData().pipe(
      map((fighterArray$) => fighterArray$.map(
        (fighter: any) => {
          if (fighter.country === 'Republic of Ireland') {
            fighter.country = 'Ireland';
          } else {
            fighter.country = fighter.country;
          }
          return fighter;
        }
      ))
    ).subscribe(data => {
      this.myData = data;
      this.myFilteredData = data;
    });
    this.navbarSearchService.navResultSubject.subscribe(val => {
      this.navInputSearchValue = val;
      console.log('val from navComp converted to capitals:' + this.navInputSearchValue);
    });
  }


  getFilteredResult(valueFromDropdownComponent) {
    console.log(valueFromDropdownComponent);

    if (valueFromDropdownComponent === 'all') {
      this.myFilteredData = this.myData;
    } else {
      // tslint:disable-next-line:triple-equals
      this.myFilteredData = this.myData.filter(item => item.id == valueFromDropdownComponent);
    }
  }

  open(data) {
    const modalRef = this.modalService.open(FighterCardModalComponent);
    modalRef.componentInstance.title =  data.fullName.toUpperCase();
    modalRef.componentInstance.fighterData = data;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
          this.loadAllUsers();
      });
  }

  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
      });
  }

}
