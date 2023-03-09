package ru.kata.spring.boot_security.demo.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/v1/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public List<User> listUsers() {
        return userService.getUsers();
    }

    @GetMapping("{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        userService.addUser(user);
        return user;
    }

    @PutMapping("{id}")
    public User updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return user;
    }
    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/admin/edit/{id}")
    public String updateUserOld(@PathVariable Long id,
                             @ModelAttribute("user") User user,
                             Model model) {
        Set<Role> newRoles = new HashSet<>();
        for (Role role : user.getRoles()) {
            newRoles.add(roleService.getRoleByName(role.getName()));
        }
        user.setRoles(newRoles);
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @GetMapping("/admin/user")
    public String showUser(Model model, Principal principal) {
        model.addAttribute("user", userService.loadUserByUsername(principal.getName()));
        model.addAttribute("principal", principal);
        return "show_user_admin";
    }
}
