import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../../provider.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-providerdetail',
  templateUrl: './providerdetail.component.html',
  styleUrls: ['./providerdetail.component.css']
})
export class ProviderdetailComponent implements OnInit {

  public providerId;
  public provider = [];
  public errorMsg;
  constructor(private providerService: ProviderService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.providerId = id;
    });
    this.providerService.getProviderDetail(this.providerId).subscribe(
      (data) => {console.log(data); this.provider = data; },
      (error) => {this.errorMsg = error; console.log(error); }
    );
  }

  edit(provider) {
    this.router.navigate(['/provider', provider.id, 'edit']);
  }
  delete(provider) {
    this.providerService.deleteProvider(provider.id).subscribe(
      response => {
        console.log('Delete success');
        this.goBack();
      },
      error => console.error('Error!', error)
    );
  }
  goBack() {
    this.router.navigate(['/provider'], { relativeTo: this.route });
  }

}
