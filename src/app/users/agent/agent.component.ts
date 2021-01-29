import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Policy } from 'src/app/models/policy.model';
import { PolicyDataService, PolicyDBResponseData } from 'src/app/services/data/policy-data.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }


@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  agentCode: string = '';
 
  displayedColumns: string[] = ['policyNumber', 'vehicle', 'premium', 'term', 'nextPaymentDate'];
  dataSource: Object[];


  constructor(
    private policyDataService: PolicyDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(
      userdata => {
        this.agentCode = userdata.userDataResolver.accountNumber;
        console.log(`From agent component: ${this.agentCode}`);
     }
    );
    
    this.policyDataService
      .getPolicies(this.agentCode)
      .pipe(
        map(policies => {
          const policyArr: Policy[] = [];
          for (const key in policies) {
            if (policies.hasOwnProperty(key)) {
              policyArr.push({ ...policies[key], policyNumber: key });
            }
          }
          return policyArr.filter(policy => policy.agentCode === this.agentCode);
        }),
    ).subscribe(policies => {
      console.log(policies);
      this.dataSource = policies;
    });
  
    
  }
 
}
