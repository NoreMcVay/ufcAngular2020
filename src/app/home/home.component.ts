import { Component, OnInit, OnDestroy } from '@angular/core';
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
  deletedArray = [];

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(private fetchingDataService: FetchingDataService,
              private navbarSearchService: NavbarSearchResultService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router) {

              this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
                this.currentUser = user;
              });
  }


  ngOnInit() {
    this.loadAllUsers();
    this.fetchingDataService.getData()
    // .pipe(
    //   map(
    //     (fighters) => fighters.map((fighter: any) => {
    //       return {
    //         fullName: 'VALENTINA SHEVCHENKO',
    //         nickname: 'BULLET',
    //         id: 7,
    //         imagePath: 'assets/images/fighter-cards/5.jpg',
    //         videoPath: 'https://www.youtube.com/embed/hahc6zcWx0',
    //         Flags: 'assets/images/country-flags/kyrgyzstan.jpg'
    //       };
    //     })
    //   )
    // )
    .subscribe(data => {
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

  viewFighterProfile(fighterId) {
    this.fetchingDataService.idNumberValue.next(fighterId);
    console.log('fighter id from home component', fighterId);
    this.router.navigate(['fighterProfile', fighterId]);
  }

  deleteFighter(fighterId) {
    this.myFilteredData = this.myFilteredData.filter((fighter) => fighter.id !== fighterId);
  }


}
