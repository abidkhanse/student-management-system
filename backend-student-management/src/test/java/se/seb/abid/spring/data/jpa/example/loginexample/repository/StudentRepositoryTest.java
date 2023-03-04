package se.seb.abid.spring.data.jpa.example.loginexample.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Student;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StudentRepositoryTest {

    @Autowired
    private StudentRepository studentRepository;


    @Test
    public void getStudentsList() {
        List<Student> students = studentRepository.findAll();
        for (Student std : students) {
            System.out.println("Student " + std.toString());
        }
    }

    @Test
    public void saveStudent() {

        Student khan = new Student("Khan", "khan@seb.se", "a");
        studentRepository.save(khan);
    }


}