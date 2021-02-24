import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth.guard';
import { PolicyDataResolverService } from '../services/resolvers/policy-data-resolver.service';
import { UserDataResolverService } from '../services/resolvers/user-data-resolver.service';
import { AgentComponent } from './agent/agent.component';
import { InsuredComponent } from './insured/insured.component';
import { PaymentInfoComponent } from './insured/payment-info/payment-info.component';
import { UsersComponent } from './users.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthGuard],
    resolve: {
      userDataResolver: UserDataResolverService,
    },
    children: [
      {
        path: 'insured',
        component: InsuredComponent,
        resolve: {
          policyResolver: PolicyDataResolverService,
        },
      },
      { path: 'insured/payment', component: PaymentInfoComponent },
      { path: 'agent', component: AgentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
