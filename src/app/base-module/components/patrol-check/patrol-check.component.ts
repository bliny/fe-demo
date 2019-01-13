import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidatorFunctions} from "../FormValidatorFunctions";
import {PatrolCheck} from "../../services/patrol-check.service";
import {PatrolActionComponent} from "../patrol-action/patrol-action.component";
import {Observable} from "rxjs/internal/Observable";
import {PatrolAction, PatrolActionService} from "../../services/patrol-action.service";
import {MatAutocompleteSelectedEvent} from "@angular/material";
import {Place} from '../../services/place.service';

@Component({
  selector: 'patrol-check',
  templateUrl: './patrol-check.component.html',
  styleUrls: ['./patrol-check.component.scss']
})
export class PatrolCheckComponent implements OnInit {


  @Input()
  patrolCheckFromGroup: FormGroup;

  @Input()
  submitted: boolean;

  @Input()
  patrolCheck: PatrolCheck;

  @Input()
  selectedPlace: Place;


  patrolActions: Array<PatrolAction>;
  selectedPatrolAction: PatrolAction;

  static createPatrolCheckFormGroup(): FormGroup {
    return new FormGroup({
      place: new FormGroup({
        id: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required])
      }),
      question: new FormControl('', [Validators.required]),
      pictures: new FormArray([], []), // Validators.required, Validators.minLength(1), Validators.maxLength(5)
      patrolActionAutoCompleteInput: new FormControl('', []),
      patrolAction: PatrolActionComponent.createPatrolActionFormGroup(),
      description: new FormControl('', [Validators.required]),
    });
  }


  options: Array<string>;
  filteredOptions: Observable<PatrolAction[]>;

  constructor(private patrolActionService: PatrolActionService) {}

  ngOnInit() {

    this.patrolActionService.getPatrolActions().subscribe( actions => {
      this.patrolActions = actions;
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.submitted.currentValue) {
      FormValidatorFunctions.validateAllFormFields(this.patrolCheckFromGroup);
    }
    if (changes.selectedPlace && changes.selectedPlace.currentValue) {
      this.patrolCheckFromGroup.get('place').setValue(changes.selectedPlace.currentValue);
    }
    if (changes.patrolCheck && changes.patrolCheck.currentValue) {
      this.patrolCheckFromGroup.get('place').setValue(changes.patrolCheck.currentValue.place);
      this.patrolCheckFromGroup.get('description').setValue(changes.patrolCheck.currentValue.description);
      this.patrolCheckFromGroup.get('question').setValue(changes.patrolCheck.currentValue.question);
      this.patrolCheckFromGroup.get('patrolActionAutoCompleteInput').setValue(changes.patrolCheck.currentValue.patrolAction.name);
      this.patrolCheckFromGroup.get('patrolAction').setValue(changes.patrolCheck.currentValue.patrolAction);

    }
  }

  get place() {
    return this.patrolCheckFromGroup.get('place');
  }

  get question() {
    return this.patrolCheckFromGroup.get('question');
  }

  get description() {
    return this.patrolCheckFromGroup.get('description');
  }

  get patrolActionAutoCompleteInput() {
    return this.patrolCheckFromGroup.get('patrolActionAutoCompleteInput');
  }

  get patrolAction() {
    return this.patrolCheckFromGroup.get('patrolAction');
  }

  get placeName() {
    return this.patrolCheckFromGroup.get('place').get('name').value;
  }



  patrolActionSelected($event: MatAutocompleteSelectedEvent) {
    this.selectedPatrolAction = this.patrolActions.find( action => action.name === $event.option.value);
  }

  onAppSelect(app: string) {
    console.log('sd')
  }

  patrolActionChange($event) {
    console.log($event);
  }

  newAction() {
    this.patrolActionAutoCompleteInput.setValue('');
    this.selectedPatrolAction = new PatrolAction();
  }
}
