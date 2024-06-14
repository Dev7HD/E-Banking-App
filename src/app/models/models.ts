//INTERFACES

export interface Customer {
    id: number,
    name: string,
    email: string
}

export interface Account {
    id: string,
    balance: number,
    createdAt: Date,
    status: AccountStatus,
    currency: string,
    customer: Customer
}

export interface Operation {
    is: string,
    date: Date,
    amount: number,
    type: OperationType,
    description: string
}

//ENUMS

export enum AccountStatus {
    CREATED,
    ACTIVATED,
    SUSPENDED
}

export enum OperationType {
    DEBIT,
    CREDIT
}

export enum AccountType {
    SAVING_ACCOUNT,
    CURRENT_ACCOUNT
}
