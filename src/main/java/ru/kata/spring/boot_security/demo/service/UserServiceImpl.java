package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.UserDao;
import ru.kata.spring.boot_security.demo.model.User;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserDao usersDao;

    public UserServiceImpl(UserDao usersDao) {
        this.usersDao = usersDao;
    }

    @Override
    public List<User> getUsers() {
        return usersDao.getAllUsers();
    }

    @Override
    public User getUser(Long id) {
        return usersDao.getUser(id);
    }

    @Transactional
    @Override
    public void addUser(User user) {
        usersDao.addUser(user);
    }

    @Transactional
    @Override
    public void saveUser(Long id, String firstName, String lastName, String email) {
        User existingUser = this.getUser(id);
        existingUser.setId(id);
        existingUser.setFirstName(firstName);
        existingUser.setLastName(lastName);
        existingUser.setEmail(email);
        usersDao.updateUser(existingUser);
    }

    @Transactional
    @Override
    public void deleteUser(Long id) {
        usersDao.deleteUser(id);
    }
}