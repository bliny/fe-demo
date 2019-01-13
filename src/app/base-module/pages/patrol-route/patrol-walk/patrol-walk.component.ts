import { Component, OnInit } from '@angular/core';
import {Patrol, PatrolService} from '../../../services/patrol.service';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PatrolCheck} from '../../../services/patrol-check.service';

@Component({
  selector: 'patrol-walk',
  templateUrl: './patrol-walk.component.html',
  styleUrls: ['./patrol-walk.component.scss']
})
export class PatrolWalkComponent implements OnInit {

  forms = new Array<FormGroup>();


  responsiblePeopleArray = [
    'Guards',
    'Ivan',
    'Greg',
  ]

  submitted=false;

  patrolId;
  patrol:Patrol;

  constructor(private patrolService: PatrolService, private activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder) {
    const params: any = this.activatedRoute.snapshot.params;
    this.patrolId = params.id;
  }

  ngOnInit() {

    this.patrolService.getPatrol(this.patrolId).subscribe(patrol => {
      this.patrol = patrol;
      this.patrol.checks.forEach( (check, index) => {
        const formGroup =this.createIrregularityCheck(check,patrol.judgingRight);
        formGroup.get('irregular').valueChanges.subscribe((
          irregularChange) => this.irregularChange(formGroup, irregularChange, check, patrol.judgingRight));


        if(patrol.walkedPatrol) {
          formGroup.setValue(patrol.walkedPatrol[index]);
        }
        this.forms.push(formGroup);


      })
    } );

  }

  irregularChange(formGroup: FormGroup, newValue: string, check: PatrolCheck, judgingRight: boolean){
    if(newValue === 'false'){
      formGroup.removeControl('pictures');
      formGroup.removeControl('severity');
      formGroup.removeControl('task');
      formGroup.removeControl('deadline');
      formGroup.removeControl('responsiblePeople');

    }else if(newValue === 'true'){
      if(check.photoMandatory){
        formGroup.addControl('pictures', new FormArray([], [Validators.required, Validators.minLength(1), Validators.maxLength(5)]));
      }else{
        formGroup.addControl('pictures', new FormArray([], []));
      }
      if(judgingRight){
        formGroup.addControl('severity',  new FormControl('', [Validators.required]));
        formGroup.addControl('task', new FormControl('', [Validators.required]));
        formGroup.addControl('deadline', new FormControl('', [Validators.required]));
        formGroup.addControl('responsiblePeople', new FormArray([], [Validators.required]));
      }
    }
  }

  createIrregularityCheck(check: PatrolCheck, judgingRight:boolean): FormGroup {
    const formGroup = new FormGroup({
      comment: new FormControl('', []),
      irregular: new FormControl('false', [Validators.required]),
    });

    return formGroup;

  }

  save(isDraft: boolean){
    this.submitted = true;
    let isValid = true;
      this.forms.forEach( form => {
      if(isValid) {
        isValid = !form.invalid;
      }
    })

    console.log(isValid);

    if(isValid){
      const patrolWalkData = this.forms.map(form => form.value);
      this.patrolService.addPatrolWalk(this.patrolId, patrolWalkData, isDraft)
    }


  }

}
