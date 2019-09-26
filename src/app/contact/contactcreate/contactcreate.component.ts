import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../contact.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DialogService} from '../../dialog.service';
import {StorageService} from '../../storage.service';

@Component({
  selector: 'app-contactcreate',
  templateUrl: './contactcreate.component.html',
  styleUrls: ['./contactcreate.component.css']
})
export class ContactcreateComponent implements OnInit {
  public user;
  public contactForm: FormGroup;
  public providerId: number;
  constructor(private fb: FormBuilder,
              private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService,
              private storage: StorageService) { }

  ngOnInit() {
    this.user = this.storage.getUser();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.providerId = id;
    });
    this.contactForm = this.fb.group({
      title: ['', ],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      fax: ['', [Validators.maxLength(10)]],
      toll_free: ['', [Validators.maxLength(10)]],
      email: ['', ],
    });
  }

  onSubmit() {
    console.log(this.contactForm);
    console.log(this.contactForm.value);
    this.contactService.addContact(this.contactForm.value, this.providerId)
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
    if (this.contactForm.dirty) {
      return this.dialogService.confirm();
    }
    return true;
  }
}
