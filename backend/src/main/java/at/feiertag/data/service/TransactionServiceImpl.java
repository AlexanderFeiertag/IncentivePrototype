package at.feiertag.data.service;

import at.feiertag.data.entity.TransactionEntity;
import at.feiertag.data.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private TransactionRepository repository;

    @Override
    public List<TransactionEntity> getAllTransactions() {
        List<TransactionEntity> result = new ArrayList<>();
        repository.findAll().forEach(result::add);
        Collections.sort(result, (o1, o2) -> o2.getTimestamp().compareTo(o1.getTimestamp()));

        return result;
    }

    @Override
    public TransactionEntity addTransaction(TransactionEntity incentive) {
        return repository.save(incentive);
    }
}
