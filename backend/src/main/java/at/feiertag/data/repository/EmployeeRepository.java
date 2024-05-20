package at.feiertag.data.repository;

import at.feiertag.data.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<EmployeeEntity, String> {

    @Query("from t_employee where address = :address")
    EmployeeEntity findByAddress(@Param("address") String address);
}
