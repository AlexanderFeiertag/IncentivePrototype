package at.feiertag.data.repository;

import at.feiertag.data.entity.NftIncentiveEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NftIncentiveRepository extends CrudRepository<NftIncentiveEntity, String> {

    @Query("from t_nft_incentive WHERE address = :address")
    NftIncentiveEntity findByAddress(@Param("address") String address);
}
