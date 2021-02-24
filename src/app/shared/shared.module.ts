import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PolicyPipePipe } from './pipes/policy-pipe.pipe';

@NgModule({
  declarations: [PolicyPipePipe, LoadingSpinnerComponent],
  exports: [CommonModule, FormsModule, PolicyPipePipe, LoadingSpinnerComponent],
})
export class SharedModule {}
