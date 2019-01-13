import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {PatrolActionComponent} from "../patrol-action/patrol-action.component";

@Component({
  selector: 'multiple-select-with-autocomplete',
  templateUrl: './multiple-select-with-autocomplete.component.html',
  styleUrls: ['./multiple-select-with-autocomplete.component.scss']
})
export class MultipleSelectWithAutocompleteComponent implements OnInit {

  @Input()
  placeholder: string;
  @Input()
  formArray: FormArray;
  @Input()
  searchOptions: Array<any>;
  @Input()
  submitted: boolean;

  formGroup = new FormGroup({
    itemSearch: new FormControl('', [Validators.required]),
  });


  constructor() {
  }

  ngOnInit() {
  }

  add(item: any) {
    this.formArray.push(new FormControl(item, [Validators.required]));
  }

  remove(userIndex: number) {
    this.formArray.removeAt(userIndex);
  }

  get itemSearch() {
    return this.formGroup.get('itemSearch');
  }


}
