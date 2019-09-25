import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../note.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})
export class NotelistComponent implements OnInit {
  public providerId;
  public notes = [];
  public errorMsg;
  constructor(private noteService: NoteService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.providerId = id;
    });
    this.noteService.getNote(this.providerId).subscribe(
      (data) => {console.log(data); this.notes = data; },
      (error) => {this.errorMsg = error; console.log(error); }
    );
  }

  add() {
    this.router.navigate(['/provider', this.providerId, 'note', 'new']);
  }
  edit(note) {
    this.router.navigate(['/provider', this.providerId, 'note', note.id, 'edit']);
  }

  delete(id, index) {
    this.noteService.deleteNote(this.providerId, id).subscribe(
      response => {
        this.notes.splice(index, 1);
      },
      error => console.error('Error!', error)
    );
  }

}
