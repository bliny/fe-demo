import {Injectable, OnInit} from "@angular/core";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {HttpHeaders} from "@angular/common/http/src/headers";
import {Place, PlaceService} from "./place.service";
import {PatrolAction, PatrolActionService} from "./patrol-action.service";


export class PatrolCheck {
  id: string;
  place: Place;
  question: string;
  photos: Array<string>;
  description: string;
  patrolAction: PatrolAction;
  photoMandatory: boolean = false;
}

@Injectable({
  providedIn: 'root',
})
export class PatrolCheckService implements OnInit {

  places;
  patrolChecks = new Array<PatrolCheck>();


  constructor(private placeService: PlaceService, private patrolActionService: PatrolActionService) {

    console.log('asdasd')
    this.placeService.getPlaces().subscribe(places => {

      console.log('asdasd2')
      this.places = places;

      this.patrolActionService.getPatrolActions().subscribe( actions => {
        console.log('asdasd3')
        const check1 = new PatrolCheck();
        check1.id = '0';
        check1.place = places[0];
        check1.question = 'Is carpet clean?';
        check1.description = 'Check if there is anything on the carpet(trash etc)';
        check1.patrolAction = actions[1];
        check1.photos = new Array<string>();

        const check2 = new PatrolCheck();
        check2.id = '0';
        check2.place = places[0];
        check2.question = 'Is wall clean?';
        check2.description = 'Check if there is anything on the wall(pictures etc)';
        check2.patrolAction = actions[0];
        check2.photos = new Array<string>();

        const check3 = new PatrolCheck();
        check3.id = '0';
        check3.place = places[1];
        check3.question = 'Is wall clean?';
        check3.description = 'Check if there is anything on the wall(pictures etc)';
        check3.patrolAction = actions[0];
        check3.photos = new Array<string>();

        this.patrolChecks.push(check1);
        this.patrolChecks.push(check2);
        this.patrolChecks.push(check3);


      })
    });


  }

  ngOnInit() {

  }



  createPatrolCheck(patrolAction: PatrolCheck): Observable<HttpResponse<any>> {
    patrolAction.id = '' + this.patrolChecks.length;
    this.patrolChecks.push(patrolAction);
    console.log(this.patrolChecks);
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

  editPatrolCheck(id, patrolAction: PatrolCheck){
    this.patrolChecks[id] = patrolAction;
    console.log('edited patrol acton');
    console.log(patrolAction);

  }

  getPatrolChecks(): Observable<Array<PatrolCheck>>{
    return Observable.create(ob => {
      ob.next(this.patrolChecks);
      ob.complete();

    })
  }

  getPatrolCheck(patrolActionId: string): Observable<PatrolCheck> {
    return Observable.create(ob => {
      ob.next(this.patrolChecks[patrolActionId]);
      ob.complete();
    })
  }
}
