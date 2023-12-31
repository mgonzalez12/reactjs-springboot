package com.mdcreativo.backenduserapp.repositories;

import com.mdcreativo.backenduserapp.models.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Page<User> findAll(Pageable pegeable);

   // @Query("select u from User u where u.username = :username")
    @Query("select u from User u where u.username = ?1")
    Optional<User> getUserByUsername(String username);
}
