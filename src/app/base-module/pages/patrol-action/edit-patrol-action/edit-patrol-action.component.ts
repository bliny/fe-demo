import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatrolActionComponent} from "../../../components/patrol-action/patrol-action.component";
import {HttpErrorResponse} from "@angular/common/http";
import {PatrolAction, PatrolActionService} from "../../../services/patrol-action.service";

@Component({
  selector: 'edit-patrol-action',
  templateUrl: './edit-patrol-action.component.html',
  styleUrls: ['./edit-patrol-action.component.scss']
})
export class EditPatrolActionComponent implements OnInit {

  patrolActionId;
  patrolActionFromGroup = PatrolActionComponent.createPatrolActionFormGroup();
  submitted = false;
  patrolAction: PatrolAction;

  constructor(private activatedRoute: ActivatedRoute, private patrolActionService: PatrolActionService) {
    const params: any = this.activatedRoute.snapshot.params;
    this.patrolActionId = params.id;
  }

  ngOnInit() {
    this.patrolActionService.getPatrolAction(this.patrolActionId).subscribe(x => this.patrolAction = x);
  }

  onFormSubmit() {
    this.submitted = true;
    if (this.patrolActionFromGroup.invalid) {
      return;
    } else {
      this.patrolActionService.editPatrolAction(this.patrolActionId, this.patrolActionFromGroup.value);
    }
  }

}
