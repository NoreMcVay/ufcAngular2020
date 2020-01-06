import { Component, OnInit } from '@angular/core';
import { FetchingDataService } from '../Services/fetchingDataService.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SearchService } from '../Services/searchService.service';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FighterCardModalComponent } from '../Modals/fighter-card-modal/fighter-card-modal.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.scss']
})
export class PractiseComponent implements OnInit {
  fighterData;
  searchField: FormControl;
  fighterForm: FormGroup;

  constructor(private fetchDataService: FetchingDataService,
              public fb: FormBuilder,
              private searchService: SearchService,
              private modalService: NgbModal,
              private router: Router) {

    this.searchField = new FormControl();
    this.fighterForm = fb.group({search: this.searchField});

    this.searchField.valueChanges.pipe(
      switchMap(inputValue$ => this.searchService.search(inputValue$.toUpperCase()))
      ).subscribe(results => {
        this.fighterData = results;
      });
  }


  ngOnInit() {
    console.log('path: ' + this.router.url);

    this.fetchDataService.getData().subscribe(data => {
      this.fighterData = data;
    });
  }

  open(fighter) {
    const modalRef = this.modalService.open(FighterCardModalComponent);
    modalRef.componentInstance.title =  fighter.fullName.toUpperCase();
    modalRef.componentInstance.fighterData = Object.assign({}, fighter);
  }

}

