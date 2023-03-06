package se.seb.abid.spring.data.jpa.example.loginexample.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.User;

import java.util.List;

@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;


    @Test
    public void getStudentsList() {
        List<User> students = userRepository.findAll();
        for (User std : students) {
            System.out.println("Student " + std.toString());
        }
    }

    @Test
    public void saveStudent() {

        User test = new User("test", "test@seb.se", "test", "ADMIN");
        test = userRepository.save(test);
        System.out.println(test);
        try {
            test.setEmail("tester@seb.se");
            userRepository.save(test);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        try {
            test.setEmail("test@seb.se");
            test.setUsername("tester");
            userRepository.save(test);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        userRepository.deleteById(test.getId());

    }
}