package se.seb.abid.spring.data.jpa.example.loginexample.controller;

import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/employee")
    public void addNewEmployee(@RequestBody Employee employee) {
        employeeService.addNewEmployee(employee);
    }

    @DeleteMapping(path = "/employee/{employeeid}")
    public void deleteEmployee(@PathVariable("employeeid") Long id) {
        employeeService.deleteEmployee(id);
    }


}
