package at.feiertag.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TransactionDTO implements Serializable {
    private String id;
    private String senderAddress;
    private String senderEmail;
    private String receiverAddress;
    private String receiverEmail;
    private String info;
    private String timestamp;
    private String type;
    private String reason;
}
