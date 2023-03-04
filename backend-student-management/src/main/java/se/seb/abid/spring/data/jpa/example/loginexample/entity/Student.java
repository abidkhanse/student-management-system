package se.seb.abid.spring.data.jpa.example.loginexample.entity;

import lombok.*;

import javax.persistence.*;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(uniqueConstraints = @UniqueConstraint(
        name = "emailid_unique",
        columnNames = "email_address"
))
public class Student {

    @Id
            @SequenceGenerator(
                    name = "student_sequence",
                    sequenceName = "student_sequence",
                    allocationSize = 1
            )
            @GeneratedValue(
                    strategy = GenerationType.AUTO,
                    generator = "student_sequence"

            )
    Long id;
    String studentName;

    @Column(
            name = "email_address",
            nullable = false
    )
    String email;
    String password;

    public Student(String name, String email, String password) {
        this.studentName = name;
        this.email = email;
        this.password = password;
    }

}
