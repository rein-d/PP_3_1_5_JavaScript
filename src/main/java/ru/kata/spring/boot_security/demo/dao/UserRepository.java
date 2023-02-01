package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserRepository {
    User getByEmail(String email);

    List<User> findAll();

    User getReferenceById(Long id);

    void add(User user);

    void update(User user);

    void deleteById(Long id);
}

