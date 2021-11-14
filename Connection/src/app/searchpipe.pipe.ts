import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchpipe'
})
export class SearchpipePipe implements PipeTransform {
  
  //the main function of the pipe
  transform(items: any[], searchText: string, fieldName: string): any[] {

    // return empty array if array is null
    if (!items)  { 
   return []; }

    // return the original array if search text is empty
    if (!searchText) { 
      return items; }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    // return the filtered array
    //searchtext.length is controlling for when the search should execute based on the amount of characters entered
    if(searchText.length >1){
    return items.filter(item => {
      if (item && item[fieldName]) {
        return item[fieldName].toLowerCase().includes(searchText);
      }
      return false;
    });
   } 
   //returning all items until 2 characters are entered into the search bar.
   return items;
  }
 

}
