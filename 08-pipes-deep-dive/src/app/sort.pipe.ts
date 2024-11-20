import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {

  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {

    const sortedArray = [...value];
  
    sortedArray.sort((a, b) => {
        if (direction === 'asc') {
          return a>b? 1: -1;
        }else{
          return a<b? 1: -1;
        }
      }
    )

    return sortedArray;
  }

}
