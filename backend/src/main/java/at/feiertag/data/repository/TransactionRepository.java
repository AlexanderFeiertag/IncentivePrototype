package at.feiertag.data.repository;

import at.feiertag.data.entity.TransactionEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends CrudRepository<TransactionEntity, String> {

    @Query("from t_transaction where senderAddress = :address or receiverAddress = :address")
    TransactionEntity[] findByUser(@Param("address") String address);
}
