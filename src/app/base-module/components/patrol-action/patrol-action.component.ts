import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidatorFunctions} from "../FormValidatorFunctions";
import {PatrolAction} from "../../services/patrol-action.service";

@Component({
  selector: 'patrol-action',
  templateUrl: './patrol-action.component.html',
  styleUrls: ['./patrol-action.component.scss']
})
export class PatrolActionComponent implements OnInit {

  @Input()
  patrolActionFromGroup: FormGroup;

  @Input()
  submitted: boolean;

  @Input()
  disableFields: boolean;

  @Input()
  patrolAction: PatrolAction;

  static createPatrolActionFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.submitted && changes.submitted.currentValue) {
      FormValidatorFunctions.validateAllFormFields(this.patrolActionFromGroup);
    }
    if (changes.disableFields && changes.disableFields.currentValue) {
      this.patrolActionFromGroup.get('name').disable();
      this.patrolActionFromGroup.get('description').disable();
    }else if(changes.disableFields && !changes.disableFields.currentValue){
      this.patrolActionFromGroup.get('name').enable();
      this.patrolActionFromGroup.get('description').enable();
    }
    if (changes.patrolAction && changes.patrolAction.currentValue) {
      this.patrolActionFromGroup.get('id').setValue(changes.patrolAction.currentValue.id);
      this.patrolActionFromGroup.get('name').setValue(changes.patrolAction.currentValue.name);
      this.patrolActionFromGroup.get('description').setValue(changes.patrolAction.currentValue.description);
    }
  }

  get id() {
    return this.patrolActionFromGroup.get('id');
  }

  get name() {
    return this.patrolActionFromGroup.get('name');
  }

  get description() {
    return this.patrolActionFromGroup.get('description');
  }

}
