import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { NotesData } from "./notes-data";
import { NotesEditGuard } from "./services/add-edit-gruard.service";

import { HomeComponent } from "./home/home.component";
import { AddEditNotesComponent } from "./add-edit-notes/add-edit-notes.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, AddEditNotesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(NotesData)
  ],
  providers: [NotesEditGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
