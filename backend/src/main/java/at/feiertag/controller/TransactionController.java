package at.feiertag.controller;

import at.feiertag.data.entity.EmployeeEntity;
import at.feiertag.data.entity.TransactionEntity;
import at.feiertag.data.service.EmployeeService;
import at.feiertag.data.service.TransactionService;
import at.feiertag.dto.TransactionDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HttpStatus> createTransaction(@RequestBody TransactionDTO transactionDTO) {
        try {
            TransactionEntity transactionEntity = new ModelMapper().map(transactionDTO, TransactionEntity.class);
            transactionService.addTransaction(transactionEntity);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Get all transactions
    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<List<TransactionDTO>> getTransactions() {
        try {
            List<TransactionDTO> result = new ArrayList<>();
            transactionService.getAllTransactions().forEach(transactionEntity -> result.add(new ModelMapper().map(transactionEntity, TransactionDTO.class)));

            Iterator<TransactionDTO> resultIterator = result.iterator();
            while (resultIterator.hasNext()) {
                TransactionDTO transaction = resultIterator.next();
                EmployeeEntity sender = this.employeeService.getEmployeeByAddress(transaction.getSenderAddress());
                if (sender != null) {
                    transaction.setSenderEmail(sender.getEmail());
                } else {
                    transaction.setSenderEmail("Company");
                }

                EmployeeEntity receiver = this.employeeService.getEmployeeByAddress(transaction.getReceiverAddress());
                if (receiver != null) {
                    transaction.setReceiverEmail(receiver.getEmail());
                } else {
                    transaction.setReceiverEmail("Company");
                }
            }

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{address}", produces = "application/json")
    public ResponseEntity<List<TransactionDTO>> getTransactionsByUser(@PathVariable String address) {
        try {
            List<TransactionDTO> result = new ArrayList<>();
            transactionService.getAllTransactions().stream()
                    .filter(transaction -> transaction.getSenderAddress().equals(address) || transaction.getReceiverAddress().equals(address))
                    .collect(ArrayList::new, ArrayList::add, ArrayList::addAll)
                    .forEach(transactionEntity -> result.add(new ModelMapper().map(transactionEntity, TransactionDTO.class)));

            Iterator<TransactionDTO> resultIterator = result.iterator();
            while (resultIterator.hasNext()) {
                TransactionDTO transaction = resultIterator.next();
                EmployeeEntity sender = this.employeeService.getEmployeeByAddress(transaction.getSenderAddress());
                if (sender != null) {
                    transaction.setSenderEmail(sender.getEmail());
                } else {
                    transaction.setSenderEmail("Company");
                }

                EmployeeEntity receiver = this.employeeService.getEmployeeByAddress(transaction.getReceiverAddress());
                if (receiver != null) {
                    transaction.setReceiverEmail(receiver.getEmail());
                } else {
                    transaction.setReceiverEmail("Company");
                }
            }

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
