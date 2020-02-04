import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddEditNotesComponent } from '../add-edit-notes/add-edit-notes.component';



@Injectable()
export class NotesEditGuard implements CanDeactivate<AddEditNotesComponent> {

    canDeactivate(component: AddEditNotesComponent): boolean {
        if (component.isDirty) {
            const NoteTitle = component.notesData.title || 'New Notes';
            return confirm(`Navigate away and lose all changes to ${NoteTitle}?`);
        }
        return true;
    }
}