package at.feiertag.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class NftIncentiveDTO implements Serializable {
    private String address;
    private String icon;
}
