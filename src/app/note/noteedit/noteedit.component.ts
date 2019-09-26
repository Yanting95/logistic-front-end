import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteService} from '../../note.service';
import {Observable} from 'rxjs';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'app-noteedit',
  templateUrl: './noteedit.component.html',
  styleUrls: ['./noteedit.component.css']
})
export class NoteeditComponent implements OnInit {
  public providerId;
  public noteId;
  public note;
  public noteForm: FormGroup;
  constructor(private fb: FormBuilder,
              private noteService: NoteService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let provider_id = parseInt(params.get('id'));
      this.providerId = provider_id;
      let note_id = parseInt(params.get('id2'));
      this.noteId = note_id;
    });
    this.noteForm = this.fb.group({
      note: ['', [Validators.required]],
    });
    this.noteService.getNoteDetail(this.providerId, this.noteId).subscribe(
      (data) => {
        this.note = data;
        this.noteForm.setValue({
          note: this.note.note,
        });
      }
    );
  }
  onSubmit() {
    console.log(this.providerId);
    console.log(this.noteForm.value);
    this.noteService.editNote(this.noteForm.value, this.providerId, this.noteId)
      .subscribe(
        response => {
          console.log('Success!', response);
          this.router.navigate(['/provider', this.providerId]);
        },
        error => console.error('Error!', error)
      );
  }

  goBack() {
    this.router.navigate(['/provider', this.providerId], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.noteForm.dirty) {
      return this.dialogService.confirm();
    }
    return true;
  }
}
