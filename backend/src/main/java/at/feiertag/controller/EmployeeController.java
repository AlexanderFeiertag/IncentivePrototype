package at.feiertag.controller;

import at.feiertag.data.entity.EmployeeEntity;
import at.feiertag.dto.EmployeeDTO;
import at.feiertag.data.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HttpStatus> createEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            EmployeeEntity employeeEntity = new ModelMapper().map(employeeDTO, EmployeeEntity.class);
            employeeService.addEmployee(employeeEntity);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/", consumes = "application/json", produces = "application/json")
    public ResponseEntity<HttpStatus> updateEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            EmployeeEntity employeeEntity = new ModelMapper().map(employeeDTO, EmployeeEntity.class);
            employeeService.updateEmployee(employeeEntity);

            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/{address}", produces = "application/json")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable String address) {
        try {
            employeeService.deleteEmployee(address);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/", produces = "application/json")
    public ResponseEntity<List<EmployeeDTO>> getEmployees() {
        try {
            List<EmployeeDTO> result = new ArrayList<>();
            employeeService.getAllEmployees().forEach(employeeEntity -> result.add(new ModelMapper().map(employeeEntity, EmployeeDTO.class)));

            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{address}", produces = "application/json")
    public ResponseEntity<EmployeeDTO> getEmployee(@PathVariable String address) {
        try {
            EmployeeEntity result = null;
            result = employeeService.getEmployeeByAddress(address);

            if (result != null) {
                EmployeeDTO employeeDTO = new ModelMapper().map(result, EmployeeDTO.class);

                return new ResponseEntity<>(employeeDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
