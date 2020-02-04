import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { Notes } from "../notes";
import { tap, catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NotesService {
  private notesUrl = "api/notes";
  private notes: Notes[];

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Notes[]> {
    return this.http.get<Notes[]>(this.notesUrl).pipe(
      tap(data => (this.notes = data)),
       catchError(this.handleError)
    );
  }

  getNote(id: number): Observable<Notes> {
    if (id === 0) {
      return of(this.initializeNotes());
    }
    if (this.notes) {
      const foundItem = this.notes.find(item => item.id === id);
      if (foundItem) {
        return of(foundItem);
      }
    }
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Notes>(url).pipe(
      tap(data => console.log("Data: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteNote(id: number): Observable<Notes> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.notesUrl}/${id}`;
    return this.http
      .delete<Notes>(url, { headers: headers })
      .pipe(
        tap(data => console.log("deleteProduct: " + id)),
        tap(data => {
          const foundIndex = this.notes.findIndex(item => item.id === id);
          if (foundIndex > -1) {
            this.notes.splice(foundIndex, 1);
          }
        }),
        catchError(this.handleError)
      );
  }

  createNote(notes: Notes): Observable<Notes> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    notes.id = null;
    return this.http
      .post<Notes>(this.notesUrl, notes, { headers })
      .pipe(
        tap(data => console.log("createNotes: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateNote(notes: Notes): Observable<Notes> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.notesUrl}/${notes.id}`;
    return this.http
      .put<Notes>(url, notes, { headers })
      .pipe(
        tap(() => console.log("updateNotes: " + notes.id)),
        // Return the product on an update
        map(() => notes),
        catchError(this.handleError)
      );
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeNotes(): Notes {
    // Return an initialized object
    return {
      id: 0,
      title: "",
      body: "",
      modifiedDate: "",
      CreatedDate: "",
      category: "",
      color: ""
    };
  }
}
