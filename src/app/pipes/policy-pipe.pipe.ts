import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'policyPipe'
})
export class PolicyPipePipe implements PipeTransform {

  transform(policyNumber: string): unknown {
    const policy = policyNumber.trim().toUpperCase();
    return [policy.slice(0, 2), policy.slice(2, 5), policy.slice(5)].join("-");
  }

}
