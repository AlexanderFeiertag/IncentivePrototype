package at.feiertag.data.repository;

import at.feiertag.data.entity.CurrencyIncentiveEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrencyIncentiveRepository extends CrudRepository<CurrencyIncentiveEntity, String> {

    @Query("from t_currency_incentive where isAvailable = true")
    Iterable<CurrencyIncentiveEntity> findAvailable();
}
