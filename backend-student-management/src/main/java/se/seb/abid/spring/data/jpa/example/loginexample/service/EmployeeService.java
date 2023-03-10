package se.seb.abid.spring.data.jpa.example.loginexample.service;

import org.springframework.stereotype.Service;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Employee;
import se.seb.abid.spring.data.jpa.example.loginexample.repository.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {

    public final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Employee ID " + id + " not found"));

        return employee;

    }

    /*
    public User loginValidation(String username, String password) {
        Optional<User> validatedUser = employeeRepository.findEmployeeByEmailAnAndPassword(username, password);
        return validatedUser.orElse(null);
    }
    */

    private boolean isEmployeeExist(String email) {
        Employee employee = employeeRepository.findByEmail(email);
        return employee != null;
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

    public void updateEmployee(Long id, Employee employee) {
        if (!isEmployeeExist(id)) {
            throw new IllegalStateException("Employee ID " + id + " not found");
        }
        employeeRepository.updateEmployee(employee.getFirstname(), employee.getLastname(), employee.getPassword(), employee.getRole(), id);
    }

}
