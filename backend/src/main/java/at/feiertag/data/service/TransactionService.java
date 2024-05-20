package at.feiertag.data.service;

import at.feiertag.data.entity.TransactionEntity;

import java.util.List;

public interface TransactionService {

    List<TransactionEntity> getAllTransactions();

    TransactionEntity addTransaction(TransactionEntity incentive);
}
