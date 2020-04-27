import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit {
  ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19,
         20, 21, 22, 23, 24];
  selectedDropdownValue = 'all';
  @Output() emittingValueFromDropdownComp = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
  }

  onSelect(selectedDropdownValue) {
    this.emittingValueFromDropdownComp.emit(selectedDropdownValue);
  }

}
