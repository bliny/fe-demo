import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PatrolCheck, PatrolCheckService} from '../../../services/patrol-check.service';
import {Router} from '@angular/router';
import {PatrolActionService} from '../../../services/patrol-action.service';
import {PlaceService} from '../../../services/place.service';

@Component({
  selector: 'patrol-check-list',
  templateUrl: './patrol-check-list.component.html',
  styleUrls: ['./patrol-check-list.component.scss']
})
export class PatrolCheckListComponent implements OnInit {

  patrolChecks = new Map<string, Array<PatrolCheck>>();

  constructor(private patrolCheckService: PatrolCheckService,  private router: Router,
              private placeService: PlaceService, private patrolActionService: PatrolActionService) { }

  ngOnInit() {
    this.loadChecks();
  }

  loadChecks(){
    this.patrolCheckService.getPatrolChecks().subscribe( checks => {
      checks.forEach( check => {
        if(!this.patrolChecks.has(check.place.name)){
          this.patrolChecks.set(check.place.name, new Array<PatrolCheck>());
        }
        this.patrolChecks.get(check.place.name).push(check);
      })
    })
  }

  trackById(index, mapElement) {
    return mapElement.key;
  }

  edit(id: string){
    this.router.navigate(['edit-patrol-check/', id]);
  }

  delete(mapKey: string, index: number){
    //const checkToDelete = this.patrolChecks.get(mapKey).splice(index, 1);
    //console.log(checkToDelete);
  }


  addNewCheck(placeId: string){
    this.router.navigate(['create-patrol-check/', placeId]);
  }

}
