package ru.kata.spring.boot_security.demo.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;

@Repository
public class RoleRepositoryImpl implements RoleRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Role getRoleByName(String name) {
        return entityManager.createQuery("FROM Role r WHERE r.name = :name", Role.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Override
    public List<Role> getRolesByName(String name) {
        return entityManager.createQuery("FROM Role r WHERE r.name = :name", Role.class)
                .setParameter("name", name)
                .getResultList();
    }

    @Override
    public List<Role> findAll() {
        return entityManager.createQuery("FROM Role", Role.class).getResultList();
    }

    @Override
    public Role getReferenceById(Long id) {
        return entityManager.createQuery("FROM Role r WHERE r.id = :id", Role.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    @Transactional
    @Override
    public void add(Role role) {
        entityManager.persist(role);
    }

    @Transactional
    @Override
    public void update(Role role) {
        entityManager.merge(role);
    }

    @Override
    public void deleteById(Long id) {
        entityManager.createQuery("DELETE FROM Role r WHERE r.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }
}
