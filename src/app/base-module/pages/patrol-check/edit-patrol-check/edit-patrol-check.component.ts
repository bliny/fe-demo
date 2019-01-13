import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PatrolCheck, PatrolCheckService} from '../../../services/patrol-check.service';
import {Place, PlaceService} from '../../../services/place.service';
import {PatrolCheckComponent} from '../../../components/patrol-check/patrol-check.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'edit-patrol-check',
  templateUrl: './edit-patrol-check.component.html',
  styleUrls: ['./edit-patrol-check.component.scss']
})
export class EditPatrolCheckComponent implements OnInit {

  patrolCheckFromGroup = PatrolCheckComponent.createPatrolCheckFormGroup();
  submitted = false;

  checkId;

  check: PatrolCheck;

  constructor(private placeService:PlaceService ,private patrolCheckService:PatrolCheckService,  private activatedRoute: ActivatedRoute) {
    const params: any = this.activatedRoute.snapshot.params;
    this.checkId = params.id;
  }

  ngOnInit() {
    this.patrolCheckService.getPatrolCheck(this.checkId).subscribe( check => {
      this.check = check;
    })
  }

  onFormSubmit() {
    this.submitted = true;
    console.log(this.patrolCheckFromGroup.value);
    if (this.patrolCheckFromGroup.invalid) {
      console.log('invalid');
      return;
    } else {
      this.patrolCheckService.editPatrolCheck(this.checkId, this.patrolCheckFromGroup.value);
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
