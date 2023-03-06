package se.seb.abid.spring.data.jpa.example.loginexample.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.User;

import java.util.List;

@SpringBootTest
class StudentRepositoryTest {

    @Autowired
    private StudentRepository studentRepository;


    @Test
    public void getStudentsList() {
        List<User> students = studentRepository.findAll();
        for (User std : students) {
            System.out.println("Student " + std.toString());
        }
    }

    @Test
    public void saveStudent() {

        User khan = new User("Khan", "khan@seb.se", "a", "user");
        studentRepository.save(khan);
    }


}