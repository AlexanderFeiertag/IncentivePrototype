package at.feiertag.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class EmployeeDTO implements Serializable {
    private String email;
    private String address;
}