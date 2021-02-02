export class Policy {
    constructor(
        public accountBalance: string,
        public agentCode: string,
        public autoPay: boolean,
        public lastPayment: string,
        public lastPaymentDate: string,
        public nextPaymentDate: string,
        public premium: string,
        public term: string,
        public vehicle: string,
        public policyNumber?: string
    ) { }   
}
