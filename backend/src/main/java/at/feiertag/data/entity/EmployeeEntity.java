package at.feiertag.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity(name = "t_employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeEntity implements Serializable {

    @Id
    private String email;
    private String address;
}
