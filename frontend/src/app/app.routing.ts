import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './users/list/list.component';
import { FormComponent } from './users/form/form.component';
import { ViewComponent } from './users/view/view.component';

const routes: Routes = [
  { 
    path: 'users', children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component: FormComponent },
      { path: 'view/:userName', component: ViewComponent },
      { path: 'edit/:userName', component: FormComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ],
  },
  { path: '', redirectTo: '/users/list', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes);