package se.seb.abid.spring.data.jpa.example.loginexample.service;

import org.springframework.stereotype.Service;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Student;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.User;
import se.seb.abid.spring.data.jpa.example.loginexample.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    public final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getStudents() {
        return studentRepository.findAll();
    }

    public User loginValidation(String username, String password) {

        Optional<User> validatedUser = studentRepository.findStudentByEmailAnAndPassword(username, password);
        return validatedUser.orElse(null);

    }

    private boolean isStudentExist(String email) {
        Optional<User> student = studentRepository.findStudentByEmail(email);
        return student.isPresent();
    }

    public void addNewStudent(Student student) {

       if (isStudentExist(student.getEmail())) {
           throw new IllegalStateException(student.getEmail() + " is already in use");
       }
       studentRepository.save(student);
    }

    private boolean isStudentExist(Long id) {
        return studentRepository.existsById(id);
    }
    public void deleteStudent(Long id) {
        if (!isStudentExist(id)) {
            throw new IllegalStateException("Student ID " + id + " not found");
        }
        studentRepository.deleteById(id);
    }

}
