import { Component, OnInit } from '@angular/core';
import { GetFighterRankingService } from '../Services/getFighterRankingService.service';
import { map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FighterRecordModalComponent } from '../Modals/fighter-record-modal/fighter-record-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fighter-rankings',
  templateUrl: './fighter-rankings.component.html',
  styleUrls: ['./fighter-rankings.component.scss']
})
export class FighterRankingsComponent implements OnInit {
  rankings = [];
  searchField: FormControl;
  coolForm: FormGroup;
  p = 1;
  count = 5;

  constructor(private getFighterRankings: GetFighterRankingService,
              private modalService: NgbModal,
              public router: Router) { }


  ngOnInit() {
    console.log('path: ' + this.router.url);

    this.getFighterRankings.getData().pipe(
      map((rankings$) => rankings$.map(
        (fighter: any) => {
          fighter.Country = fighter.Country === 'America' ? 'U.S.A' : fighter.Country;
          return fighter;
        }
      )
      )
    ).subscribe(p4pList => {
      this.rankings = p4pList;
      console.log(this.rankings);
    });

  }

  open(fighterObject) {
    const modalRef = this.modalService.open(FighterRecordModalComponent);
    modalRef.componentInstance.title = fighterObject.First + ' ' + fighterObject.Last + ' MMA Record';
    modalRef.componentInstance.dataFromFighterRankingsComp = Object.assign({}, fighterObject);
  }


}

