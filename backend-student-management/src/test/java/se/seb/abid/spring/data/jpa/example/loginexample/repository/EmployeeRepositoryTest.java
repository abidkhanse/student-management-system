package se.seb.abid.spring.data.jpa.example.loginexample.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Employee;

import java.util.List;

@SpringBootTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;


    @Test
    public void getEmployeeList() {
        List<Employee> students = employeeRepository.findAll();
        for (Employee std : students) {
            System.out.println("Employee " + std.toString());
        }
    }

    @Test
    public void getEmployeeByEmail() {
        List<Employee> students = employeeRepository.findAll();
        for (Employee std : students) {
            System.out.println(employeeRepository.findByEmail(std.getEmail()) + "  ");
        }
    }


}