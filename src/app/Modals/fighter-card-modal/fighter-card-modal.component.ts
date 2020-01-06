import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-fighter-card-modal',
  templateUrl: './fighter-card-modal.component.html',
  styleUrls: ['./fighter-card-modal.component.scss']
})
export class FighterCardModalComponent implements OnInit {
  @Input() title;
  @Input() fighterData;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
