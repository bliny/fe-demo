import {Injectable, OnInit} from "@angular/core";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {HttpHeaders} from "@angular/common/http/src/headers";

export class PatrolAction {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatrolActionService implements OnInit {

  patrolActions = new Array<PatrolAction>();


  constructor() {
    const patrol1 = new PatrolAction();
    const patrol2 = new PatrolAction();
    const patrol3 = new PatrolAction();

    patrol1.id = '0';
    patrol1.name = 'Call electrician';
    patrol1.description = 'Electrician is needed';

    patrol2.id = '1';
    patrol2.name = 'Call cleaner';
    patrol2.description = 'Cleaner is needed';

    patrol3.id = '2';
    patrol3.name = 'Call priest';
    patrol3.description = 'Priest is needed';

    this.patrolActions.push(patrol1);
    this.patrolActions.push(patrol2);
    this.patrolActions.push(patrol3);

  }

  ngOnInit(): void {
  }

  createPatrolAction(patrolAction: PatrolAction): Observable<HttpResponse<any>> {
    patrolAction.id = '' + this.patrolActions.length;
    this.patrolActions.push(patrolAction);
    return Observable.create(ob => {
      ob.next(new HttpResponse({
        body: null,
        headers: null,
        status: 200,
        statusText: null,
        url: null,
      }))
      ob.complete();
    })
  }

  editPatrolAction(id: string, patrolAction: PatrolAction){
    this.patrolActions[id].description = patrolAction.description;
    this.patrolActions[id].name = patrolAction.name;
  }

  getPatrolActions(): Observable<Array<PatrolAction>>{
    return Observable.create(ob => {
      ob.next(this.patrolActions);
      ob.complete();
    })
  }

  getPatrolAction(patrolActionId: string): Observable<PatrolAction> {
    return Observable.create(ob => {
      ob.next(this.patrolActions[patrolActionId]);
      ob.complete();
    })
  }
}
