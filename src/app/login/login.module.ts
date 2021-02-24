import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MatIconModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    SharedModule,
  ],
})
export class LoginModule {}
