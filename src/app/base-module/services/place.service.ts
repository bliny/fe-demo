import {Injectable, OnInit} from "@angular/core";
import {PatrolAction} from "./patrol-action.service";
import {Observable} from "rxjs/internal/Observable";

export class Place{
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlaceService implements OnInit {

  places = new Array<Place>();

  constructor() {

    const place1 = new PatrolAction();
    const place2 = new PatrolAction();
    const place3 = new PatrolAction();

    place1.id = '0';
    place1.name = 'WC';

    place2.id = '1';
    place2.name = 'Computer rúm';

    place3.id = '2';
    place3.name = 'Guard office';

    this.places.push(place1);
    this.places.push(place2);
    this.places.push(place3);


  }

  ngOnInit(): void {
  }

  getPlaces(): Observable<Array<Place>>{
    return Observable.create( ob => {
      ob.next(this.places);
      ob.complete();
    })
  }

  getPlace(id): Observable<Place>{
    return Observable.create( ob => {
      console.log(id);
      console.log(this.places[id]);
      ob.next(this.places[id]);
      ob.complete();
    })
  }
}
