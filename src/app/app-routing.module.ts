import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {CreatePatrolActionComponent} from "./base-module/pages/patrol-action/create-patrol-action/create-patrol-action.component";
import {EditPatrolActionComponent} from "./base-module/pages/patrol-action/edit-patrol-action/edit-patrol-action.component";
import {CreatePatrolCheckComponent} from "./base-module/pages/patrol-check/create-patrol-check/create-patrol-check.component";
import {EditPatrolCheckComponent} from "./base-module/pages/patrol-check/edit-patrol-check/edit-patrol-check.component";
import {CreatePatrolComponent} from "./base-module/pages/patrol/create-patrol/create-patrol.component";
import {PatrolCheckListComponent} from './base-module/pages/patrol-check/patrol-check-list/patrol-check-list.component';
import {PatrolRouteListComponent} from './base-module/pages/patrol-route/patrol-route-list/patrol-walk-list.component';
import {PatrolWalkComponent} from './base-module/pages/patrol-route/patrol-walk/patrol-walk.component';

const routes: Routes = [
  {
    path: 'create-patrol-action',
    component: CreatePatrolActionComponent,
  },
  {
    path: 'edit-patrol-action/:id',
    component: EditPatrolActionComponent,
  },
  {
    path: 'create-patrol-check/:placeId',
    component: CreatePatrolCheckComponent,
  },
  {
    path: 'edit-patrol-check/:id',
    component: EditPatrolCheckComponent,
  },
  {
    path: 'patrol-list',
    component: PatrolCheckListComponent,
  },
  {
    path: 'create-patrol',
    component: CreatePatrolComponent,
  },
  {
    path: '',
    component: PatrolRouteListComponent,
  },
  {
    path: 'walk/:id',
    component: PatrolWalkComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
