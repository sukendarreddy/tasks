import { Component, Inject, OnInit } from '@angular/core';
import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;
  constructor(@Inject(NotesService) public sr){}
  title = 'task';



  ngOnInit() {
  this.getNotes();
}

  getNotes(){
   // alert("Hai")
    this.sr.getNotes().subscribe(dt=>{
      this.data=dt;
      //console.log(dt);
      //alert(dt)
    })
  }
}
