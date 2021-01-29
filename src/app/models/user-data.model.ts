export class UserData {
    constructor(
        public firstName: string,
        public lastName: string,
        public fullName: string,
        public role: string,
        public accountNumber: string,
        public policyNumber?: string
    ) { }    
}