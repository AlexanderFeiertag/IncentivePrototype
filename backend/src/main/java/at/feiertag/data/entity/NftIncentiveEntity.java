package at.feiertag.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity(name = "t_nft_incentive")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NftIncentiveEntity implements Serializable {

    @Id
    private String address;
    private String icon;
}
