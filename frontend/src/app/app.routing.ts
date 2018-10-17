import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './users/list/list.component';
import { AddComponent } from './users/add/add.component';
import { ViewComponent } from './users/view/view.component';

const routes: Routes = [
  { 
    path: 'users', children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'view/:userName', component: ViewComponent },
      { path: 'edit/:userName', component: AddComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ],
  },
  { path: '', redirectTo: 'users/list', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);