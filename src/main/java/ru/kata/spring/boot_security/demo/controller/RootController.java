package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.dao.UserRepository;

import java.security.Principal;
import java.util.List;

@Controller
public class RootController {
    private final UserRepository userRepository;

    public RootController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/root")
    public String redirect(Model model, Principal principal) {
        List<String> role = userRepository.getByEmail(principal.getName()).getRoles().stream()
                .map(r -> r.getName())
                .toList();
        if (role.contains("ROLE_ADMIN")){
            return "redirect:/admin";
        }
        return "redirect:/user";
    }
    @GetMapping("/mylogout")
    public String logout(Model model, Principal principal) {
        return "logout";
    }
}
