package se.seb.abid.spring.data.jpa.example.loginexample.service;

import org.springframework.stereotype.Service;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.User;
import se.seb.abid.spring.data.jpa.example.loginexample.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    public final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User loginValidation(String username, String password) {

        Optional<User> validatedUser = userRepository.findUserByUserNameAndPassword(username, password);

        if (!validatedUser.isPresent()) {
            validatedUser = userRepository.findUserByEmailAndPassword(username, password);
        }
        return validatedUser.orElse(null);

    }

    private boolean isUserExist(String email) {
        Optional<User> student = userRepository.findUserByEmail(email);
        return student.isPresent();
    }

    public void addNewStudent(User user) {
        if (isUserExist(user.getEmail())) {
            throw new IllegalStateException(user.getEmail() + " is already in use");
        }
        userRepository.save(user);
    }

    private boolean isStudentExist(Long id) {
        return userRepository.existsById(id);
    }

    public void deleteStudent(Long id) {
        if (!isStudentExist(id)) {
            throw new IllegalStateException("Student ID " + id + " not found");
        }
        userRepository.deleteById(id);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

}
