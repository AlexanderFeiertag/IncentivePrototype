package at.feiertag.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity(name = "t_currency_incentive")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CurrencyIncentiveEntity implements Serializable {

    @Id
    private String name;
    private String description;
    private int price;
    private String icon;
    private boolean isAvailable;
}
