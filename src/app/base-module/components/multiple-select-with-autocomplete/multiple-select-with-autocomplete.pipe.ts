import { Pipe, PipeTransform } from '@angular/core';
import {PatrolAction} from "../../services/patrol-action.service";


@Pipe({ name: 'autoCompleteNamePipe'})
export class AutoCompleteNamePipe implements PipeTransform {
	transform(arrayWithNames: Array<any>, nameAutoComplete: string): Array<PatrolAction> {
    if (!arrayWithNames || !nameAutoComplete) {
      return arrayWithNames;
    }
		return arrayWithNames.filter( action => {
		  if(action.name) {
        return action.name.toLocaleLowerCase().includes(nameAutoComplete.toLocaleLowerCase())
      }else{
        return action.toLocaleLowerCase().includes(nameAutoComplete.toLocaleLowerCase())
      }
		});
	}
}
