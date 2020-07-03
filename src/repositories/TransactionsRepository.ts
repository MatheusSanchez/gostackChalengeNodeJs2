import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionServiceDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    return this.transactions;

  }

  public getBalance(): Balance {
    const finalBalance: Balance = this.transactions.reduce(
      (accumulator: Balance, transactions: Transaction) => {

        if (transactions.type == 'income') {
          accumulator.income += transactions.value;
          accumulator.total += transactions.value;
        } else {
          accumulator.outcome += transactions.value;
          accumulator.total -= transactions.value
        }

        return accumulator;
      },
      ({
        income: 0,
        outcome: 0,
        total: 0,
      }),
    );

    return finalBalance;
  }



  public create({ title, value, type }: TransactionServiceDTO): Transaction {

    const NewTransaction = new Transaction({ title, value, type });
    this.transactions.push(NewTransaction);
    return NewTransaction;


  }
}

export default TransactionsRepository;
