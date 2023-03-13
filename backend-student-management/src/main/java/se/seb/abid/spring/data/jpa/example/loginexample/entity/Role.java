package se.seb.abid.spring.data.jpa.example.loginexample.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@ToString
@Entity
public class Role {

    @Id
            @SequenceGenerator(
                    name = "role_sequence",
                    sequenceName = "role_sequence",
                    allocationSize = 1
            )
            @GeneratedValue(
                    strategy = GenerationType.IDENTITY,
                    generator = "role_sequence"

            )
    Long id;

    @Column(
            name = "role_name",
            nullable = false,
            unique = true
    )
    String role;

    public Role(String role) {

        this.role = role;
    }

}
