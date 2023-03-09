package ru.kata.spring.boot_security.demo.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import ru.kata.spring.boot_security.demo.dao.RoleRepository;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
        if (getRoles().isEmpty()) {
            addRole(new Role("ROLE_USER"));
            addRole(new Role("ROLE_ADMIN"));
        }
    }

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    @Override
    public List<Role> getRoles(String name) {
        return roleRepository.getRolesByName(name);
    }

    @Override
    public Role getRoleById(Long id) {
        return roleRepository.getReferenceById(id);
    }

    @Override
    public Role getRoleByName(String name) {
        return roleRepository.getRoleByName(name);
    }

    @Transactional
    @Override
    public void addRole(Role role) {
        roleRepository.add(role);
    }

    @Transactional
    @Override
    public void updateRole(Role role) {
        roleRepository.update(role);
    }

    @Transactional
    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}
