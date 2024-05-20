package at.feiertag.data.service;

import at.feiertag.data.entity.EmployeeEntity;
import at.feiertag.data.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private EmployeeRepository repository;

    @Override
    public List<EmployeeEntity> getAllEmployees() {
        List<EmployeeEntity> result = new ArrayList<>();
        repository.findAll().forEach(result::add);

        return result;
    }

    @Override
    public EmployeeEntity getEmployeeByEmail(String address) {
        return repository.findById(address).get();
    }

    @Override
    public EmployeeEntity getEmployeeByAddress(String address) {
        return repository.findByAddress(address);
    }

    @Override
    public EmployeeEntity addEmployee(EmployeeEntity employee) {
        return repository.save(employee);
    }

    @Override
    public EmployeeEntity updateEmployee(EmployeeEntity employee) {
        return repository.save(employee);
    }

    @Override
    public void deleteEmployee(String address) {
        repository.deleteById(address);
    }
}
