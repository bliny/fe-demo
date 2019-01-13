import { Pipe, PipeTransform } from '@angular/core';
import {PatrolAction} from "../../services/patrol-action.service";


@Pipe({ name: 'autoCompletePatrolPipe'})
export class AutoCompletePatrolPipe implements PipeTransform {
	transform(actions: Array<PatrolAction>, patrolNameToAutoComplete: string): Array<PatrolAction> {
    if (!actions || !patrolNameToAutoComplete) {
      return actions;
    }
		return actions.filter( action => action.name.toLocaleLowerCase().includes(patrolNameToAutoComplete.toLocaleLowerCase()));
	}
}
