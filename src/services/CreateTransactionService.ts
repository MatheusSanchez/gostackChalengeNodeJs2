import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionServiceDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionServiceDTO): Transaction {

    if (type == 'income' || type == 'outcome') {


      if (type == 'outcome') {
        const balance = this.transactionsRepository.getBalance();
        console.log(balance);
        if (balance.total < value) {
          throw Error("There isn't enought money !");
        }
      }

      const NewTransaction = this.transactionsRepository.create({ title, value, type });
      return NewTransaction;

    } else {
      throw Error("Current type of transaction isn't accepted !");
    }
  }

}

export default CreateTransactionService;
