package se.seb.abid.spring.data.jpa.example.loginexample.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {



}
