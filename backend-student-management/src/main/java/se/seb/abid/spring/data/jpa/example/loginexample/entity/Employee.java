package se.seb.abid.spring.data.jpa.example.loginexample.entity;
import lombok.*;
import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class Employee {

    @Id
            @SequenceGenerator(
                    name = "employee_sequence",
                    sequenceName = "employee_sequence",
                    allocationSize = 1
            )
            @GeneratedValue(
                    strategy = GenerationType.IDENTITY,
                    generator = "employee_sequence"

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
    String firstname;
    String lastname;


    public Employee(String email, String password, String role, String firstname, String lastname) {

        this.email = email;
        this.password = password;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
