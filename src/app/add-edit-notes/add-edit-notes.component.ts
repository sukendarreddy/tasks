import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Notes } from "../notes";
import { NotesService } from "../services/notes.service";

@Component({
  selector: "app-add-edit-notes",
  templateUrl: "./add-edit-notes.component.html",
  styleUrls: ["./add-edit-notes.component.css"]
})
export class AddEditNotesComponent implements OnInit {
  @ViewChild(NgForm) editForm: NgForm;
  pageTitle: string = "Notes Edit";
  errorMessage: string;
  private originalNote: Notes;
  notesData: Notes;

  get isDirty(): boolean {
    return this.editForm.dirty ? true : false;
  }

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params["id"];
      this.getnotes(id);
    });
  }

  getnotes(id: number): void {
    this.notesService.getNote(id).subscribe(
      product => this.onnotesRetrieved(product),
      error => (this.errorMessage = <any>error)
    );
  }

  onnotesRetrieved(notes: Notes): void {
    // Reset back to pristine
    this.editForm.reset();
    // Display the data in the form
    // Use a copy to allow cancel.
    this.originalNote = notes;
    this.notesData = Object.assign({}, notes);
    if (this.notesData.id === 0) {
      this.pageTitle = "Add Note";
    } else {
      this.pageTitle = `Edit Note: ${this.notesData.title}`;
    }
  }

  cancel(): void {
    // Navigate back to the product list
    this.router.navigate(["/"]);
  }

  deletenotes(): void {
    if (this.notesData.id) {
      if (confirm(`Really delete the Notes: ${this.notesData.title}?`)) {
        this.notesService.deleteNote(this.notesData.id).subscribe(
          () => this.onSaveComplete(),
          (error: any) => (this.errorMessage = <any>error)
        );
      }
    } else {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    }
  }

  saveNote(): void {
    if (this.editForm.valid) {
      if (this.notesData.id === 0) {
        this.notesService.createNote(this.notesData).subscribe({
          next: () => this.onSaveComplete(),
          error: err => (this.errorMessage = err)
        });
      } else {
        this.notesService.updateNote(this.notesData).subscribe({
          next: () => this.onSaveComplete(),
          error: err => (this.errorMessage = err)
        });
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  onSaveComplete(): void {
    // Reset back to pristine
    this.editForm.reset(this.editForm.value);
    // Navigate back to the product list
    this.router.navigate(["/"]);
  }
}
