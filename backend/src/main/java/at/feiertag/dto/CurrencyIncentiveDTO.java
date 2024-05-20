package at.feiertag.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CurrencyIncentiveDTO implements Serializable {
    private String name;
    private String description;
    private int price;
    private String icon;
    private boolean isAvailable;
}
