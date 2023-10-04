package com.mdcreativo.backenduserapp.services;

import com.mdcreativo.backenduserapp.models.dto.UserDto;
import com.mdcreativo.backenduserapp.models.entities.User;
import com.mdcreativo.backenduserapp.models.UserRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<UserDto> findAll();

    Page<UserDto> findAll(Pageable pegeable);
    Optional<UserDto> findById(Long id);

    UserDto save(User user);

    Optional<UserDto> update(UserRequest user, Long id);

    void  remove(Long id);

    Optional<User> findByUsername(String username);
}
