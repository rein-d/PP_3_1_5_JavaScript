package ru.kata.spring.boot_security.demo.service;


import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.UserRepository;
import ru.kata.spring.boot_security.demo.exceptions.NotFoundException;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(Long id) {
        try {
            return userRepository.getReferenceById(id);
        } catch (NoResultException ex) {
            throw new NotFoundException("User with id: " + id + " not found");
        }
    }

    @Override
    public void addUser(User user) {
        Set<Role> newRoles = new HashSet<>();
        if (user.getRoles().isEmpty()) {
            newRoles.add(roleService.getRoleByName("ROLE_USER"));
        } else {
            for (Role role : user.getRoles()) {
                newRoles.add(roleService.getRoleByName(role.getName()));
            }
        }
        user.setRoles(newRoles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.add(user);
    }

    @Transactional
    @Override
    public void updateUser(User user) {
        if (user.getPassword().isEmpty()) {
            user.setPassword(userRepository.getReferenceById(user.getId()).getPassword());
        } else if (user.getPassword().equals(userRepository.getReferenceById(user.getId()).getPassword())) {
            userRepository.update(user);
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.update(user);
        }
    }

    @Transactional
    @Override
    public void deleteUser(Long id) {
        User user = getUser(id);
        userRepository.deleteById(user.getId());
    }

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.getByEmail(username);
    }
}