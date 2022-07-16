export interface AccountDetails {
  id:                string;
  balance:           number;
  page:              number;
  totalePages:       number;
  size:              number;
  accountOperations: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  description:   string;
  amount:        number;
  type:          string;
}

export interface Debit {
  accountId: string;
  amount: number;
  description: string;
}
