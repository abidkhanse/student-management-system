package se.seb.abid.spring.data.jpa.example.loginexample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Student;

import java.util.Optional;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s WHERE s.email = ?1")
    Optional<Student> findStudentByEmail(String email);

    @Query("SELECT s FROM Student s WHERE s.email = ?1 and s.password = ?2")
    Optional <Student> findStudentByEmailAnAndPassword(String email, String password);

}
