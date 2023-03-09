package se.seb.abid.spring.data.jpa.example.loginexample.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Employee;
import se.seb.abid.spring.data.jpa.example.loginexample.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping(path = "employee-service")
@CrossOrigin(origins = {"http://localhost:4200"})
public class EmployeeController {

    private final EmployeeService employeeService;
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
       return employeeService.getEmployees();
    }

    @GetMapping("/employee/{employeeid}")
    public Employee getEmployee(@PathVariable("employeeid") Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping("/employee")
    public void addNewEmployee(@RequestBody Employee employee) {

        try {
            employeeService.addNewEmployee(employee);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @DeleteMapping(path = "/employee/{employeeid}")
    public void deleteEmployee(@PathVariable("employeeid") Long id) {
        employeeService.deleteEmployee(id);
    }

    @PutMapping(path = "/employee/{employeeid}")
    public void updateEmployee(@PathVariable("employeeid") Long id, @RequestBody Employee updatedVersion) {
        try {
            employeeService.updateEmployee(id, updatedVersion);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }


}
