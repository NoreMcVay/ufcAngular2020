import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {

  transform(arrayValues: any, navInputSearchValue: string, fullNameProperty: string): any {
    if (arrayValues.length === 0 || navInputSearchValue === '') {
      return arrayValues;
    }
    const matchedResultArray = [];

    for (const item of arrayValues) {
      if (item[fullNameProperty] === navInputSearchValue) {
        matchedResultArray.push(item);
      }
    }
    return matchedResultArray;
  }

}
