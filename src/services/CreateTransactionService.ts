import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance(); // pegando o saldo atual

    // se o type for diferente dos valores do array, será retornado o erro.
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid');
    }

    // if (type !== 'outcome' && type !== 'income') {
    //   throw new Error('Type Invalid!');
    // }

    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
