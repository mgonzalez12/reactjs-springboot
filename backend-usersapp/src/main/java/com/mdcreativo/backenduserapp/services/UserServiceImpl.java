package com.mdcreativo.backenduserapp.services;

import com.mdcreativo.backenduserapp.models.entities.User;
import com.mdcreativo.backenduserapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository repository;

    @Override
    public List<User> findAll() {
        return (List<User>) repository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public Optional<User> update(User user, Long id) {
       return this.findById(id)
               .map(userDb -> {
                   userDb.setUsername(user.getUsername());
                   userDb.setEmail(user.getEmail());
                   return this.save(userDb);
               })
               .map(Optional::ofNullable)
               .orElse(Optional.empty());
    }

    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }
}
