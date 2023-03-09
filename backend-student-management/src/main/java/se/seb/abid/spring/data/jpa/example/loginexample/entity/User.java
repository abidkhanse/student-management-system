package se.seb.abid.spring.data.jpa.example.loginexample.entity;

import lombok.*;

import javax.persistence.*;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class User {

    @Id
            @SequenceGenerator(
                    name = "student_sequence",
                    sequenceName = "student_sequence",
                    allocationSize = 1
            )
            @GeneratedValue(
                    strategy = GenerationType.IDENTITY,
                    generator = "student_sequence"

            )
    Long id;

    @Column(
            name = "email_address",
            nullable = false,
            unique = true
    )
    String email;
    String password;
    String role;

    public User(String username, String email, String password, String role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

}
