import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FetchingDataService } from '../Services/fetchingDataService.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FighterCardModalComponent } from '../Modals/fighter-card-modal/fighter-card-modal.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fighter-detail',
  templateUrl: './fighter-detail.component.html',
  styleUrls: ['./fighter-detail.component.scss']
})
export class FighterDetailComponent implements OnInit {
  fighterId;
  fighter;

  idFromService;

  constructor(private route: ActivatedRoute,
              private myService: FetchingDataService,
              private ref: ChangeDetectorRef,
              private modalService: NgbModal) {}

    ngOnInit() {
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.fighterId = paramMap.get('fightId');
        console.log('id using paramMap = ' + this.fighterId);
      });
      this.myService.getFighterDataById(this.fighterId).pipe(
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
      ).subscribe(fighterDetail => {
        this.fighter = fighterDetail;
        console.log('fighter object retrieved using id' , this.fighter);
      });
      this.myService.getidNumberUpdateListener().subscribe(id => {
        this.idFromService = id;
        this.ref.markForCheck();
        console.log('id using a Service = ' +  this.idFromService);
      });
    }

    open(data) {
      const modalRef = this.modalService.open(FighterCardModalComponent);
      modalRef.componentInstance.title =  data.fullName.toUpperCase();
      modalRef.componentInstance.fighterData = data;
    }

}
