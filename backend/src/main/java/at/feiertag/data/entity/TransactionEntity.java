package at.feiertag.data.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity(name = "t_transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionEntity implements Serializable {

    @Id
    private String id;
    private String senderAddress;
    private String receiverAddress;
    private String info;
    private String timestamp;
    private String type;
    private String reason;
}
