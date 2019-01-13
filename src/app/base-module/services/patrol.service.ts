import {Injectable, OnInit} from "@angular/core";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {HttpHeaders} from "@angular/common/http/src/headers";
import {Place, PlaceService} from "./place.service";
import {PatrolAction, PatrolActionService} from "./patrol-action.service";
import {PatrolCheck, PatrolCheckService} from './patrol-check.service';

export enum PatrolStatus{
  NOT_STARTED = 'NOT_STARTED',
  DRAFT = 'DRAFT',
  DONE = 'DONE',

}

export class WalkedPatrol{

  comment: string;
  irregular: boolean;
  pictures: Array<string>;
  severity: string;
  task: string;
  deadline: any;
  responsiblePeople: Array<string>;

}

export class Patrol{
  id: string;
  name: string;
  recurrence: string;
  oneTimeDateTime: string;
  startDate:string;
  endDate: string;
  interval:  string;
  repetitions:  number;
  minimalTimeBetweenChecks: number;
  checks: Array<PatrolCheck>;
  checksInOrder: boolean;
  judgingRight: boolean;
  peoplesToNotify: Array<string>;
  responsiblePeople: Array<string>;
  status:PatrolStatus;
  walkedPatrol: Array<WalkedPatrol>;
}


@Injectable({
  providedIn: 'root',
})
export class PatrolService implements OnInit {

  places;
  patrols = new Array<Patrol>();


  constructor(private patrolCheckService: PatrolCheckService) {

    this.patrolCheckService.getPatrolChecks().subscribe( checks => {

      const newPatrol = new Patrol();

      newPatrol.id = '0';
      newPatrol.name = "In order example";
      newPatrol.oneTimeDateTime= "2019-02-04T04:31:00+00:00";
      newPatrol.checks = checks;
      newPatrol.checksInOrder= true;
      newPatrol.judgingRight= true;
      newPatrol.peoplesToNotify= ['Joe', 'Daniel'];
      newPatrol.responsiblePeople= ['Greg'];
      newPatrol.status= PatrolStatus.NOT_STARTED;


      const newPatrol2 = new Patrol();

      newPatrol2.id = '1';
      newPatrol2.name = "Not in order example";
      newPatrol2.oneTimeDateTime= "2019-02-05T04:31:00+00:00";
      newPatrol2.checks = checks;
      newPatrol2.checksInOrder= false;
      newPatrol2.judgingRight= true;
      newPatrol2.peoplesToNotify= ['Joe', 'Daniel'];
      newPatrol2.responsiblePeople= ['Greg'];
      newPatrol2.status= PatrolStatus.DRAFT;

      this.patrols.push(newPatrol);
      this.patrols.push(newPatrol2);


    })




  }

  ngOnInit() {

  }

  createPatrol(patrol: Patrol): Observable<HttpResponse<any>> {
    patrol.id = '' + this.patrols.length;
    this.patrols.push(patrol);
    console.log('new patrol');
    console.log(patrol);
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


  getPatrols(): Observable<Array<Patrol>>{
    return Observable.create(ob => {
      ob.next(this.patrols);
      ob.complete();

    })
  }

  getPatrol(patrolId): Observable<Patrol> {
    return Observable.create(ob => {
      ob.next(this.patrols[patrolId]);
      ob.complete();
    })
  }

  addPatrolWalk(patrolId: any, patrolWalkData: any[], isDraft: boolean) {
    console.log(patrolWalkData);

    if(isDraft){
      this.patrols[patrolId].status = PatrolStatus.DRAFT;
      this.patrols[patrolId].walkedPatrol = patrolWalkData;
    }else{
      this.patrols[patrolId].status = PatrolStatus.DONE;
    }
  }
}
