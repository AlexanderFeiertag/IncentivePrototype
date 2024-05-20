package at.feiertag.dto;

import lombok.Data;

import java.util.List;

@Data
public class BalanceDTO {
    private String symbol;
    private String name;
    private String address;
    private Long amount;
    private List<Long> ids;
}