import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  firstName: String = '';
  fullName: String = '';
  policyNumber: String = '';
  userDetailsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userDetailsSub = this.route.data.subscribe(data => {
      this.firstName = data.userDataResolver.firstName;
      const role = data.userDataResolver.role;
      console.log(`From user component: ${role}`);
      this.router.navigate([`./${role}`], { relativeTo: this.route });
    });
  }

  ngOnDestroy(): void {
    this.userDetailsSub.unsubscribe();
  }
}
