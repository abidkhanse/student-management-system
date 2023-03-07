package se.seb.abid.spring.data.jpa.example.loginexample.service;

import org.springframework.stereotype.Service;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Employee;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.User;
import se.seb.abid.spring.data.jpa.example.loginexample.repository.EmployeeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    public final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public User loginValidation(String username, String password) {

        Optional<User> validatedUser = employeeRepository.findEmployeeByEmailAnAndPassword(username, password);
        return validatedUser.orElse(null);

    }

    private boolean isEmployeeExist(String email) {
        Optional<User> employee = employeeRepository.findEmployeeByEmail(email);
        return employee.isPresent();
    }

    public void addNewEmployee(Employee employee) {

       if (isEmployeeExist(employee.getEmail())) {
           throw new IllegalStateException(employee.getEmail() + " is already in use");
       }
       employeeRepository.save(employee);
    }

    private boolean isEmployeeExist(Long id) {
        return employeeRepository.existsById(id);
    }
    public void deleteEmployee(Long id) {
        if (!isEmployeeExist(id)) {
            throw new IllegalStateException("Employee ID " + id + " not found");
        }
        employeeRepository.deleteById(id);
    }

}