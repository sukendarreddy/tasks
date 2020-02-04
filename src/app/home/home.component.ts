import { Component, OnInit, Inject } from "@angular/core";
import { NotesService } from "../services/notes.service";
import { Router } from "@angular/router";
import { Notes } from "../notes";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  notesDataObject: Notes[];
  notesData: Notes;
  errorMessage: any;
  constructor(
    @Inject(NotesService) public notesService,
    public router: Router
  ) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe(result => {
      this.notesDataObject = result;
    });
  }

  getNote(id: number): void {
    this.notesService.getNote(id).subscribe(
      data => this.notesData = data,
      error => (this.errorMessage = <any>error)
    );
  }

  deleteNote(data: Notes) {
    if (data.id) {
      if (confirm(`Really delete the Notes: ${data.title}?`)) {
        this.notesService.deleteNote(data.id).subscribe(
          () => this.onSaveComplete(),
          (error: any) => (this.errorMessage = <any>error)
        );
      }
    }
  }

  route() {
    this.router.navigate([0, "edit"]);
  }

  onSaveComplete(): void {
    // Navigate back to the notes list
    this.router.navigate(["/"]);
  }
}
