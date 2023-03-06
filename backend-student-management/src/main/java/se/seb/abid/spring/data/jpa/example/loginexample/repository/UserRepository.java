package se.seb.abid.spring.data.jpa.example.loginexample.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.User;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT s FROM User s WHERE s.email = ?1")
    Optional<User> findUserByEmail(String email);
    @Query("SELECT s FROM User s WHERE s.email = ?1 and s.password = ?2")
    Optional <User> findUserByEmailAndPassword(String email, String password);
    @Query("SELECT s FROM User s WHERE s.username = ?1 and s.password = ?2")
    Optional <User> findUserByUserNameAndPassword(String user, String password);

}
