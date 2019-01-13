import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CalculatorComponent} from "./components/calculator/calculator.component";
import {PatrolActionComponent} from './components/patrol-action/patrol-action.component';
import {CreatePatrolActionComponent} from './pages/patrol-action/create-patrol-action/create-patrol-action.component';
import {EditPatrolActionComponent} from './pages/patrol-action/edit-patrol-action/edit-patrol-action.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocompleteModule,
  MatBottomSheetModule,
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatListModule,
  MatRadioModule, MatRippleModule, MatSelectModule,
  MatSlideToggleModule, MatStepperModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule
} from "@angular/material";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import { HeaderComponent } from './components/header/header.component';
import { PatrolCheckComponent } from './components/patrol-check/patrol-check.component';
import { CreatePatrolCheckComponent } from './pages/patrol-check/create-patrol-check/create-patrol-check.component';
import { EditPatrolCheckComponent } from './pages/patrol-check/edit-patrol-check/edit-patrol-check.component';
import {FileUploadComponent} from "./components/file-upload/file-upload.component";
import {AutoCompletePatrolPipe} from "./components/patrol-check/auto-complete-patrol.pipe";
import { CreatePatrolComponent } from './pages/patrol/create-patrol/create-patrol.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from "@angular/material-moment-adapter";
import {AmazingTimePickerModule} from "amazing-time-picker";
import { MultipleSelectWithAutocompleteComponent } from './components/multiple-select-with-autocomplete/multiple-select-with-autocomplete.component';
import {SortablejsModule} from "angular-sortablejs";
import {AutoCompleteNamePipe} from "./components/multiple-select-with-autocomplete/multiple-select-with-autocomplete.pipe";
import { CreateCheckPopupComponent } from './pages/patrol/create-patrol/create-check-popup/create-check-popup.component';
import { PatrolCheckListComponent } from './pages/patrol-check/patrol-check-list/patrol-check-list.component';
import { PatrolRouteListComponent } from './pages/patrol-route/patrol-route-list/patrol-walk-list.component';
import { PatrolWalkComponent } from './pages/patrol-route/patrol-walk/patrol-walk.component';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@NgModule({
  declarations: [CalculatorComponent,AutoCompleteNamePipe,FileUploadComponent,AutoCompletePatrolPipe, PatrolActionComponent, CreatePatrolActionComponent, EditPatrolActionComponent, HeaderComponent, PatrolCheckComponent, CreatePatrolCheckComponent, EditPatrolCheckComponent, CreatePatrolComponent, MultipleSelectWithAutocompleteComponent, CreateCheckPopupComponent, PatrolCheckListComponent, PatrolRouteListComponent, PatrolWalkComponent],
  exports: [CalculatorComponent, HeaderComponent],
  imports:[ CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule,
    MatDialogModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatTabsModule,
    AmazingTimePickerModule,
    MatMomentDateModule,
    MatStepperModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    SortablejsModule.forRoot({animation: 150}),
  ],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  entryComponents: [CreateCheckPopupComponent],
})
export class BaseModule {
}
