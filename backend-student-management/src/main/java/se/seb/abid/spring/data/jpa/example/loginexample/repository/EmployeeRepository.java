package se.seb.abid.spring.data.jpa.example.loginexample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Employee;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.User;

import java.util.Optional;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT s FROM Employee s WHERE s.email = ?1")
    Optional<User> findEmployeeByEmail(String email);

    @Query("SELECT s FROM Employee s WHERE s.email = ?1 and s.password = ?2")
    Optional <User> findEmployeeByEmailAnAndPassword(String email, String password);

}
