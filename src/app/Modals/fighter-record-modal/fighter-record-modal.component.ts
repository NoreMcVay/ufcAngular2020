import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fighter-record-modal',
  templateUrl: './fighter-record-modal.component.html',
  styleUrls: ['./fighter-record-modal.component.scss']
})
export class FighterRecordModalComponent implements OnInit {
  @Input() title;
  @Input() dataFromFighterRankingsComp;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log('fighter rankingsobject: ' + this.dataFromFighterRankingsComp);
  }
}
