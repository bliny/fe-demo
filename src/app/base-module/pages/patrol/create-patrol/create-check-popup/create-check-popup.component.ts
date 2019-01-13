import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Place} from '../../../../services/place.service';

@Component({
  selector: 'create-check-popup',
  templateUrl: './create-check-popup.component.html',
  styleUrls: ['./create-check-popup.component.scss']
})
export class CreateCheckPopupComponent implements OnInit {

  place: Place;

  constructor(
    public dialogRef: MatDialogRef<CreateCheckPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Place) {
    this.place = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
