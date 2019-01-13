import { Component, OnInit } from '@angular/core';
import {PatrolActionService} from "../../../services/patrol-action.service";
import {PatrolActionComponent} from "../../../components/patrol-action/patrol-action.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'create-patrol-action',
  templateUrl: './create-patrol-action.component.html',
  styleUrls: ['./create-patrol-action.component.scss']
})
export class CreatePatrolActionComponent implements OnInit {

  patrolActionFromGroup = PatrolActionComponent.createPatrolActionFormGroup();
  submitted = false;

  constructor(private patrolActionService:PatrolActionService) { }

  ngOnInit() {
  }

  onFormSubmit() {
    this.submitted = true;
    console.log(this.patrolActionFromGroup.value);
    if (this.patrolActionFromGroup.invalid) {
      return;
    } else {
      this.patrolActionService.createPatrolAction(this.patrolActionFromGroup.value)
        .subscribe((resBody) => this.handleRegistrationSuccess(), (error) => this.handleRegistrationError(error));
    }
  }

  private handleRegistrationSuccess() {
    this.patrolActionFromGroup.reset();
    console.log('success');
  }

  private handleRegistrationError(error: HttpErrorResponse) {
    console.log(error);
  }

}
