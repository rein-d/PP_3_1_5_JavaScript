package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getUsers();
    User getUser(Long id);
    void addUser(User user);
    void saveUser(Long id, String firstName, String lastName, Integer age,
                  String email, String password, List<Role> roles);
    void deleteUser(Long id);
}
