package com.mdcreativo.backenduserapp.services;

import com.mdcreativo.backenduserapp.models.IUser;
import com.mdcreativo.backenduserapp.models.dto.UserDto;
import com.mdcreativo.backenduserapp.models.dto.mapper.DtoMapperUser;
import com.mdcreativo.backenduserapp.models.entities.Role;
import com.mdcreativo.backenduserapp.models.entities.User;
import com.mdcreativo.backenduserapp.models.UserRequest;
import com.mdcreativo.backenduserapp.repositories.RoleRepository;
import com.mdcreativo.backenduserapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository repository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDto> findAll()
    {
      List<User> users = (List<User>) repository.findAll();

      return users
              .stream()
              .map( u -> DtoMapperUser.builder().setUser(u).build() )
              .collect(Collectors.toList());
    }

    @Override
    public Page<UserDto> findAll(Pageable pegeable) {
        return repository
                .findAll(pegeable)
                .map( u -> DtoMapperUser.builder().setUser(u).build() );
    }

    @Override
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).map(u -> DtoMapperUser
                .builder()
                .setUser(u)
                .build());

    }

    @Override
    public UserDto save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Optional<Role> role = roleRepository.findByName("ROLE_USER");
        user.setRoles(getRoles(user));
        return DtoMapperUser.builder().setUser(repository.save(user)).build();
    }

    @Override
    public Optional<UserDto> update(UserRequest user, Long id) {
        Optional<User> o = repository.findById(id);
        User userOptional = null;
        if(o.isPresent()) {
            User userDb = o.orElseThrow();
            userDb.setRoles(getRoles(user));
            userDb.setUsername(user.getUsername());
            userDb.setEmail(user.getEmail());
            userOptional = repository.save(userDb);
        }

        return Optional.ofNullable(DtoMapperUser.builder().setUser(userOptional).build());
    }

    @Override
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    private List<Role> getRoles(IUser user) {
        Optional<Role> role = roleRepository.findByName("ROLE_USER");
        List<Role> roles = new ArrayList<>();
        if(role.isPresent()) {
            roles.add(role.orElseThrow());
        }
        if (user.isAdmin()){
            Optional<Role> roleAdmin = roleRepository.findByName("ROLE_ADMIN");
            if (roleAdmin.isPresent()) {
                roles.add(roleAdmin.orElseThrow());
            }
        }
        return roles;
    }
}
