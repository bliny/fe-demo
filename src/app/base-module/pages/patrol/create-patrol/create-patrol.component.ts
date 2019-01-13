import { Component, OnInit } from '@angular/core';
import {PatrolCheckComponent} from "../../../components/patrol-check/patrol-check.component";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatrolCheck, PatrolCheckService} from "../../../services/patrol-check.service";
import {MatCheckboxChange, MatDialog} from "@angular/material";
import {CreateCheckPopupComponent} from "./create-check-popup/create-check-popup.component";
import {Patrol, PatrolService} from '../../../services/patrol.service';
import * as moment from 'moment';


export enum RecurrenceType{
  ONE_TIME = 'ONE_TIME',
  RECURRING_IN_INTERVAL = 'RECURRING_IN_INTERVAL',
  RECURRING_NUMBER_OF_TIMES = 'RECURRING_NUMBER_OF_TIMES',
}

@Component({
  selector: 'create-patrol',
  templateUrl: './create-patrol.component.html',
  styleUrls: ['./create-patrol.component.scss']
})
export class CreatePatrolComponent implements OnInit {


  recurrenceType = RecurrenceType;

  intervals = ['HOUR', 'DAY', 'WEEK'];

  myImage: HTMLElement;
  options = { animation: 150 };


  patrolCheckIdList;

  patrolChecks = new Map<string, Array<PatrolCheck>>();
  selectedPatrolChecks = new Map<string, Array<PatrolCheck>>();
  submitted: boolean;


  panels = [
    {title: 'Item #1', content: 'Some content of the item #1'},
    {title: 'Item #2', content: 'Some content of the item #2'},
    {title: 'Item #3', content: 'Some content of the item #3'},
    {title: 'Item #4', content: 'Some content of the item #4'},
    {title: 'Item #5', content: 'Some content of the item #5'},
    {title: 'Item #6', content: 'Some content of the item #6'},
  ]

  peoples = [
    'Daniel',
    'Rex',
    'Adam',
  ]

  responsiblePeopleArray = [
    'Guards',
    'Ivan',
    'Greg',
  ]

  patrolFromGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    recurrence: new FormControl('', [Validators.required]),
    oneTimeDate: new FormControl('', [Validators.required]),
    oneTimeTime: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    interval: new FormControl('', [Validators.required]),
    repetitions: new FormControl('', [Validators.required, Validators.min(0)]),
    minimalTimeBetweenChecks: new FormControl('', [Validators.required, Validators.min(0)]),
    checks: new FormArray([], [Validators.required]),
    checksInOrder: new FormControl(false, [Validators.required]),
    judgingRight: new FormControl(false, [Validators.required]),
    peoplesToNotify: new FormArray([], [Validators.required]),
    responsiblePeople: new FormArray([], [Validators.required]),

  });

  constructor(private patrolCheckService: PatrolCheckService, public dialog: MatDialog, private patrolService:PatrolService) { }


  openDialog(check: PatrolCheck): void {
    const dialogRef = this.dialog.open(CreateCheckPopupComponent, {
      //width: '250px',
      data: check.place,
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.patrolChecks.clear();
      this.loadChecks();
    });
  }

  ngOnInit() {
    this.loadChecks();

    this.patrolFromGroup
      .get('recurrence')
      .valueChanges.subscribe((newRecurrenceType) => this.timeTypeChanged(newRecurrenceType));
    this.patrolFromGroup.get('recurrence').setValue(this.recurrenceType.ONE_TIME);

  }

  loadChecks(){
    this.patrolCheckService.getPatrolChecks().subscribe( checks => {
      var checksToAdd: Array<PatrolCheck>;
      if(!this.patrolCheckIdList){
        this.patrolCheckIdList = checks.map( check => check.id);
        checksToAdd = checks;
      }else{
        checksToAdd = checks.filter(check => !this.patrolCheckIdList.includes(check.id))
        this.patrolCheckIdList.push(checks.map( check => check.id));
      }
      checksToAdd.forEach( check => {
        if(!this.patrolChecks.has(check.place.name)){
          this.patrolChecks.set(check.place.name, new Array<PatrolCheck>());
        }
        this.patrolChecks.get(check.place.name).push(check);
      })
    })
  }

  timeTypeChanged(newTimeType: string) {
    if (newTimeType === RecurrenceType.ONE_TIME) {
      this.patrolFromGroup.get('oneTimeDate').setValidators([Validators.required]);
      this.patrolFromGroup.get('oneTimeTime').setValidators([Validators.required]);
      this.patrolFromGroup.get('startDate').setValidators([]);
      this.patrolFromGroup.get('endDate').setValidators([]);
      this.patrolFromGroup.get('interval').setValidators([]);
      this.patrolFromGroup.get('repetitions').setValidators([]);
    } else if (newTimeType === RecurrenceType.RECURRING_IN_INTERVAL) {
      this.patrolFromGroup.get('oneTimeDate').setValidators([]);
      this.patrolFromGroup.get('oneTimeTime').setValidators([]);
      this.patrolFromGroup.get('startDate').setValidators([Validators.required]);
      this.patrolFromGroup.get('endDate').setValidators([Validators.required]);
      this.patrolFromGroup.get('interval').setValidators([Validators.required]);
      this.patrolFromGroup.get('repetitions').setValidators([]);
    } else if (newTimeType === RecurrenceType.RECURRING_NUMBER_OF_TIMES) {
      this.patrolFromGroup.get('oneTimeDate').setValidators([]);
      this.patrolFromGroup.get('oneTimeTime').setValidators([]);
      this.patrolFromGroup.get('startDate').setValidators([Validators.required]);
      this.patrolFromGroup.get('endDate').setValidators([]);
      this.patrolFromGroup.get('interval').setValidators([Validators.required]);
      this.patrolFromGroup.get('repetitions').setValidators([Validators.required]);
    }
    this.patrolFromGroup.get('oneTimeDate').reset();
    this.patrolFromGroup.get('oneTimeTime').reset();
    this.patrolFromGroup.get('startDate').reset();
    this.patrolFromGroup.get('endDate').reset();
    this.patrolFromGroup.get('interval').reset();
    this.patrolFromGroup.get('repetitions').reset();
  }

  onFormSubmit() {
    this.submitted = true;
    console.log(this.patrolFromGroup.value);
    if (this.patrolFromGroup.invalid) {
      console.log('invalid')
      return;
    } else {

      const newPatrol = new Patrol();

      newPatrol.oneTimeDateTime= this.formatDate(this.patrolFromGroup.value.oneTimeDate,this.patrolFromGroup.value.oneTimeTime);
      newPatrol.startDate= this.patrolFromGroup.value.startDate;
      newPatrol.endDate= this.patrolFromGroup.value.endDate;
      newPatrol.interval= this.patrolFromGroup.value.interval;
      newPatrol.repetitions= this.patrolFromGroup.value.repetitions;
      newPatrol.minimalTimeBetweenChecks= this.patrolFromGroup.value.minimalTimeBetweenChecks;
      newPatrol.checks= this.patrolFromGroup.value.checks;
      newPatrol.checksInOrder= this.patrolFromGroup.value.checksInOrder;
      newPatrol.judgingRight= this.patrolFromGroup.value.judgingRight;
      newPatrol.peoplesToNotify= this.patrolFromGroup.value.peoplesToNotify;
      newPatrol.responsiblePeople= this.patrolFromGroup.value.responsiblePeople;

      this.patrolService.createPatrol(newPatrol);
    }
  }

  formatDate(date: string, time: string): string {
    const splitTime = time.split(':');
    console.log(splitTime);
    return moment(date)
      .add(splitTime[0], 'hours')
      .add(splitTime[1], 'minutes')
      .format('YYYY-MM-DDTHH:mm:ssZ');
  }


  get name() {
    return this.patrolFromGroup.get('name');
  }

  get recurrence() {
    return this.patrolFromGroup.get('recurrence');
  }

  get oneTimeDate() {
    return this.patrolFromGroup.get('oneTimeDate');
  }

  get oneTimeTime() {
    return this.patrolFromGroup.get('oneTimeTime');
  }

  get startDate() {
    return this.patrolFromGroup.get('startDate');
  }

  get endDate() {
    return this.patrolFromGroup.get('endDate');
  }

  get interval() {
    return this.patrolFromGroup.get('interval');
  }

  get repetitions() {
    return this.patrolFromGroup.get('repetitions');
  }

  get checksInOrder() {
    return this.patrolFromGroup.get('checksInOrder');
  }

  get judgingRight() {
    return this.patrolFromGroup.get('judgingRight');
  }

  get minimalTimeBetweenChecks() {
    return this.patrolFromGroup.get('minimalTimeBetweenChecks');
  }

  get peoplesToNotify(){
    return this.patrolFromGroup.get('peoplesToNotify');
  }

  get responsiblePeople(){
    return this.patrolFromGroup.get('responsiblePeople');
  }

  get checks(){
    return this.patrolFromGroup.get('checks');
  }


  setMandatoryPhoto($event: MatCheckboxChange, check: PatrolCheck){
    check.photoMandatory = $event.checked;
  }

  placeCheckboxClicked($event: MatCheckboxChange, check: PatrolCheck) {
    const placeName = check.place.name;
    if($event.checked){
      if(!this.selectedPatrolChecks.has(placeName)){
        this.selectedPatrolChecks.set(placeName, new Array<PatrolCheck>());
      }
      this.selectedPatrolChecks.get(placeName).push(check);
      const checkFormArray = this.patrolFromGroup.get('checks') as FormArray;
      checkFormArray.push(new FormControl(check, [Validators.required]));
    }else{
      const checkFormArray = this.patrolFromGroup.get('checks') as FormArray;
      checkFormArray.removeAt(checkFormArray.value.indexOf(check));
      const filteredArray = this.selectedPatrolChecks.get(placeName).filter( element => element.question !== check.question)
      if (filteredArray.length === 0){
        this.selectedPatrolChecks.delete(placeName);
      }else{
        this.selectedPatrolChecks.set(placeName, filteredArray);
      }
    }
  }
}
