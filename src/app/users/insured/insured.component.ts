import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../services/data/user-data.service';
import { PolicyDataService, PolicyDBResponseData } from '../../services/data/policy-data.service';
import { Policy } from 'src/app/models/policy.model';

@Component({
  selector: 'app-insured',
  templateUrl: './insured.component.html',
  styleUrls: ['./insured.component.css']
})
export class InsuredComponent implements OnInit, OnDestroy {
  
  fullName: string = '';
  policyNumber: string = '';
  policyData: Policy;
  userDataSub: Subscription;
  policyDataSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userDataService: UserDataService,
    private policyDataService: PolicyDataService
  ) { }

  ngOnInit(): void {

    this.userDataSub = this.route.parent.data.subscribe(
      userData => {
        console.log(userData);
        this.fullName = userData.userDataResolver.fullName;
        this.policyNumber = userData.userDataResolver.policyNumber;
      }
    );
    
    this.policyData = this.route.snapshot.data.policyResolver;

    // this.policyDataSub = this.route.data.subscribe(
    //   policyData => this.policyData = policyData.policyResolver
    // );

    // this.userDataSub = this.userDataService.userDataSubject.subscribe(
    //   userData => {
    //     this.fullName = userData.fullName;
    //     this.policyNumber = userData.policyNumber;
    //   }
    // );
       
    // this.policyDataSub = this.policyDataService
    //   .getPolicy(this.policyNumber)
    //   .subscribe(policy => this.handlePolicyData(policy));

    // console.log(`From Insured Compoenet- policyData: ${this.policyData}`);
    // console.log(`From Insured component: ${this.policyNumber}`);
  }

  onPayment() {
    this.router.navigate(['./payment'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.userDataSub.unsubscribe();
  }

}
