import { Component, OnInit } from '@angular/core';
import {Patrol, PatrolService, PatrolStatus} from '../../../services/patrol.service';
import {Router} from '@angular/router';

@Component({
  selector: 'patrol-walk-list',
  templateUrl: './patrol-walk-list.component.html',
  styleUrls: ['./patrol-walk-list.component.scss']
})
export class PatrolRouteListComponent implements OnInit {

  patrolStatus= PatrolStatus;

  patrols: Array<Patrol>;

  constructor(private patrolService: PatrolService, private router: Router) { }

  ngOnInit() {
    this.patrolService.getPatrols().subscribe( patrols => this.patrols = patrols);
  }

  editPatrol(patrol: Patrol){
    this.router.navigate(['walk/', patrol.id]);
  }




}
