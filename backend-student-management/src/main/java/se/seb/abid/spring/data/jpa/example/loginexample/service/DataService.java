package se.seb.abid.spring.data.jpa.example.loginexample.service;

import org.springframework.stereotype.Service;
import se.seb.abid.spring.data.jpa.example.loginexample.entity.Role;
import se.seb.abid.spring.data.jpa.example.loginexample.repository.RoleRepository;

import java.util.List;

@Service
public class DataService {

    public final RoleRepository dataRepository;

    public DataService(RoleRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    public List<Role> getRoles() {
        return dataRepository.findAll();
    }

}
