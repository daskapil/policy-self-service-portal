import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Policy } from 'src/app/models/policy.model';
import { PolicyDataService } from 'src/app/services/data/policy-data.service';


export interface PolicyDetails {
    accountBalance: string;
    agentCode: string;
    autoPay: boolean;
    fullName: string;
    lastPayment: string;
    lastPaymentDate: string;
    nextPaymentDate: string;
    premium: string;
    term: string;
    vehicle: string;
    policyNumber: string;
}

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  agentCode: string = '';
  ELEMENT_DATA: PolicyDetails[] = [];
  displayedColumns: string[] = ['policyNumber', 'fullName', 'vehicle', 'premium', 'term', 'nextPaymentDate'];
  dataSource = new MatTableDataSource<PolicyDetails>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private policyDataService: PolicyDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

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
      this.dataSource.data = policies as PolicyDetails[];
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
}
