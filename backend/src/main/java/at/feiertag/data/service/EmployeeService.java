package at.feiertag.data.service;

import at.feiertag.data.entity.EmployeeEntity;

import java.util.List;

public interface EmployeeService {

    List<EmployeeEntity> getAllEmployees();

    EmployeeEntity getEmployeeByEmail(String email);

    EmployeeEntity getEmployeeByAddress(String address);

    EmployeeEntity addEmployee(EmployeeEntity employee);

    EmployeeEntity updateEmployee(EmployeeEntity employee);

    void deleteEmployee(String address);
}
