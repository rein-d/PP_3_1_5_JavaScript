package ru.kata.spring.boot_security.demo.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    List<User> getUsers();
    User getUser(Long id);
    void addUser(User user);
    void saveUser(Long id, String firstName, String lastName, String email);
    void deleteUser(Long id);
}
