package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

public interface RoleRepository {
    Role getRoleByName(String name);

    List<Role> getRolesByName(String name);

    List<Role> findAll();

    Role getReferenceById(Long id);

    void add(Role role);

    void update(Role role);

    void deleteById(Long id);
}
