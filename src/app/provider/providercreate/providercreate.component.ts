import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProviderService} from '../../provider.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-providercreate',
  templateUrl: './providercreate.component.html',
  styleUrls: ['./providercreate.component.css']
})
export class ProvidercreateComponent implements OnInit {
  public providerForm: FormGroup;
  constructor(private fb: FormBuilder, private providerService: ProviderService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.providerForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.maxLength(5)]],
      phone: ['', [Validators.maxLength(10)]],
      fax: ['', [Validators.maxLength(10)]],
      toll_free: ['', [Validators.maxLength(10)]],
      email: ['', ],
      start_time: ['', ],
      end_time: ['', ],
    });
  }

  onSubmit() {
    console.log(this.providerForm);
    console.log(this.providerForm.value);
    this.providerService.addProvider(this.providerForm.value)
      .subscribe(
        response => {
          console.log('Success!', response);
          this.router.navigate(['/provider']);
        },
        error => console.error('Error!', error)
      );
  }

  goBack() {
    this.router.navigate(['/provider'], { relativeTo: this.route });
  }
}
