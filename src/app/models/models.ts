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

export interface AccountHistory {
    operationDTOList: Operation[];
    id: string;
    balance: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}

export interface LoginData {
    username: string,
    password: string
}

export interface LoginToken {
    access_token: string
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
