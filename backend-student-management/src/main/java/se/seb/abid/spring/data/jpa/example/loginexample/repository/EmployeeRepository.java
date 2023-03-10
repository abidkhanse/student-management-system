package se.seb.abid.spring.data.jpa.example.loginexample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Employee;

import java.util.Optional;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT s FROM Employee s WHERE s.email = ?1")
    Optional<Employee> findEmployeeByEmail(String email);

    Employee findByEmail(String emailId);

    /*
    @Query("UPDATE Employee s SET s.email_address = employee.email, firstname = s.employee.firstname ," +
            " lastname = s.employee.lastname, password = s.employee.password, role= s.employee.role WHERE s.id=:id")
    Employee updateEmployee(String emailId);

    @Modifying
    @Query("UPDATE Employee s SET s.email = :email_address, s.firstname = :firstname WHERE s.id=:id")
    void updateEmployee(@Param("email_address") String email_address, @Param("firstname") String firstname, Long id);
     */

    @Transactional
    @Modifying
    @Query("UPDATE Employee SET firstname = :firstname, lastname = :lastname, password = :password, role = :role WHERE id = :id")
    Integer updateEmployee(String firstname, String lastname, String password, String role, Long id);


}
