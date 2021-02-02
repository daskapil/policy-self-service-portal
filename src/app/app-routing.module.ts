import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { PolicyDataResolverService } from './services/resolvers/policy-data-resolver.service';
import { UserDataResolverService } from './services/resolvers/user-data-resolver.service';
import { AgentComponent } from './users/agent/agent.component';
import { InsuredComponent } from './users/insured/insured.component';
import { PaymentInfoComponent } from './users/insured/payment-info/payment-info.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    component: UsersComponent,
    canActivate: [AuthGuard],
    resolve: {
      userDataResolver: UserDataResolverService
    },
    children: [
      {
        path: 'insured',
        component: InsuredComponent,
        resolve: {
          policyResolver: PolicyDataResolverService
        }
        // children: [
        //   { path: 'payment', component: PaymentInfoComponent }
        // ]
      },
      { path: 'insured/payment', component: PaymentInfoComponent },
      { path: 'agent', component: AgentComponent }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
