import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProviderService} from '../../provider.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'app-provideredit',
  templateUrl: './provideredit.component.html',
  styleUrls: ['./provideredit.component.css']
})
export class ProvidereditComponent implements OnInit {

  public providerId;
  public provider;
  public providerForm: FormGroup;
  constructor(private fb: FormBuilder,
              private providerService: ProviderService,
              private route: ActivatedRoute,
              private router: Router,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.providerId = id;
    });
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
    this.providerService.getProviderDetail(this.providerId).subscribe(
      (data) => {
        this.provider = data;
        this.providerForm.setValue({
          name: this.provider.name,
          address: this.provider.address,
          country: this.provider.country,
          city: this.provider.city,
          state: this.provider.state,
          zip: this.provider.zip,
          phone: this.provider.phone,
          fax: this.provider.fax,
          toll_free: this.provider.toll_free,
          email: this.provider.email,
          start_time: this.provider.start_time,
          end_time: this.provider.end_time,
        });
      }
    );
  }

  onSubmit() {
    console.log(this.providerId);
    console.log(this.providerForm.value);
    this.providerService.editProvider(this.providerForm.value, this.providerId)
      .subscribe(
        response => {
          console.log('Success!', response);
          this.router.navigate(['/provider'], this.providerId);
        },
        error => console.error('Error!', error)
      );
  }

  goBack() {
    this.router.navigate(['/provider', this.providerId], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.providerForm.dirty) {
      return this.dialogService.confirm();
    }
    return true;
  }
}
