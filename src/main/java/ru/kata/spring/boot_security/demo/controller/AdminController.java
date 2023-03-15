package ru.kata.spring.boot_security.demo.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("admin")
public class AdminController {
    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public String listUsers(Model model, Principal principal) {
        model.addAttribute("users", userService.getUsers());
        model.addAttribute("principal", principal);
        model.addAttribute("currentUser", (User) userService.loadUserByUsername(principal.getName()));
        return "admin";
    }

    @GetMapping("/user")
    public String showUser(Model model, Principal principal) {
        model.addAttribute("user", userService.loadUserByUsername(principal.getName()));
        model.addAttribute("principal", principal);
        return "show_user_admin";
    }
}