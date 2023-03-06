package se.seb.abid.spring.data.jpa.example.loginexample.controller;

import org.springframework.web.bind.annotation.*;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.User;
import se.seb.abid.spring.data.jpa.example.loginexample.service.UserService;

import java.util.List;

@RestController
@RequestMapping(path = "user-service")
@CrossOrigin(origins = {"http://localhost:4200"})
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/user/{email}/{password}")
    public User verifyUserByEmail(@PathVariable("email") String username, @PathVariable("password") String password) {
        return userService.loginValidation(username, password);
    }

    @PostMapping("/user")
    public void addNewStudent(@RequestBody User user) {
        userService.addNewStudent(user);
    }

    @DeleteMapping(path = "/user/{userid}")
    public void deleteStudent(@PathVariable("userid") Long id) {
        userService.deleteStudent(id);
    }

}
