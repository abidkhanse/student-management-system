package se.seb.abid.spring.data.jpa.example.loginexample.controller;

import org.springframework.web.bind.annotation.*;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Student;
import se.seb.abid.spring.data.jpa.example.loginexample.service.StudentService;

import java.util.List;

@RestController
@RequestMapping(path = "student-service")
public class StudentController {

    private final StudentService studentService;
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<Student> getStudents() {
       return studentService.getStudents();
    }

    @GetMapping("/student/{username}/{password}")
    public Student verifyStudent(@PathVariable("username") String username, @PathVariable("password") String password) {
        return studentService.loginValidation(username, password);
    }
    @PostMapping("/student")
    public void addNewStudent(@RequestBody Student student) {
        studentService.addNewStudent(student);
    }

    @DeleteMapping(path = "/student/{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long id) {
        studentService.deleteStudent(id);
    }


}
