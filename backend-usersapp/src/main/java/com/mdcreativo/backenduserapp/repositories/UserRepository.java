package com.mdcreativo.backenduserapp.repositories;

import com.mdcreativo.backenduserapp.models.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
