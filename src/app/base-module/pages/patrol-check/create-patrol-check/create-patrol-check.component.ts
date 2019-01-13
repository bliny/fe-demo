import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {PatrolCheckComponent} from "../../../components/patrol-check/patrol-check.component";
import {PatrolCheckService} from "../../../services/patrol-check.service";
import {ActivatedRoute} from '@angular/router';
import {Place, PlaceService} from '../../../services/place.service';

@Component({
  selector: 'create-patrol-check',
  templateUrl: './create-patrol-check.component.html',
  styleUrls: ['./create-patrol-check.component.scss']
})
export class CreatePatrolCheckComponent implements OnInit {


  patrolCheckFromGroup = PatrolCheckComponent.createPatrolCheckFormGroup();
  submitted = false;

  @Input()
  placeId;

  place: Place;

  constructor(private placeService:PlaceService ,private patrolCheckService:PatrolCheckService,  private activatedRoute: ActivatedRoute) {
    const params: any = this.activatedRoute.snapshot.params;
    this.placeId = params.placeId;
  }

  ngOnInit() {
    this.placeService.getPlace(this.placeId).subscribe(place => this.place = place);
  }

  onFormSubmit() {
    this.submitted = true;
    console.log(this.patrolCheckFromGroup.value);
    if (this.patrolCheckFromGroup.invalid) {
      console.log('invalid');
      return;
    } else {
      this.patrolCheckService.createPatrolCheck(this.patrolCheckFromGroup.value)
        .subscribe((resBody) => this.handleRegistrationSuccess(), (error) => this.handleRegistrationError(error));
    }
  }

  private handleRegistrationSuccess() {
    this.patrolCheckFromGroup.reset();
    console.log('success');
  }

  private handleRegistrationError(error: HttpErrorResponse) {
    console.log(error);
  }

}
