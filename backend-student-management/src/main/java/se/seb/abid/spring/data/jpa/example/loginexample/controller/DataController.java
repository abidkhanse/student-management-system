package se.seb.abid.spring.data.jpa.example.loginexample.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Role;
import se.seb.abid.spring.data.jpa.example.loginexample.service.DataService;
import se.seb.abid.spring.data.jpa.example.loginexample.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping(path = "data-service")
@CrossOrigin(origins = {"http://localhost:4200"})
public class DataController {


    private final DataService dataService;
    public DataController(EmployeeService employeeService, DataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/roles")
    public List<Role> getRoles() {
       return dataService.getRoles();
    }




}
