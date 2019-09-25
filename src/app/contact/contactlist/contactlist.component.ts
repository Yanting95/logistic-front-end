import { Component, OnInit } from '@angular/core';
import {ContactService} from '../../contact.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProviderService} from '../../provider.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  public providerId;
  public contacts = [];
  public errorMsg;
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.providerId = id;
    });
    this.contactService.getContact(this.providerId).subscribe(
      (data) => {console.log(data); this.contacts = data; },
      (error) => {this.errorMsg = error; console.log(error); }
    );
  }

  delete(id, index) {
    this.contactService.deleteContact(this.providerId, id).subscribe(
      response => {
        this.contacts.splice(index, 1);
      },
      error => console.error('Error!', error)
    );
  }

  add() {
    this.router.navigate(['/provider', this.providerId, 'contact', 'new']);
  }
  edit(contact) {
    this.router.navigate(['/provider', this.providerId, 'contact', contact.id, 'edit']);
  }
}
