import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddEditNotesComponent } from './add-edit-notes/add-edit-notes.component';
import { NotesEditGuard } from './services/add-edit-gruard.service';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path: ':id/edit',
   canDeactivate: [ NotesEditGuard ],
    component: AddEditNotesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
