package com.mdcreativo.backenduserapp.models.dto.mapper;

import com.mdcreativo.backenduserapp.models.dto.UserDto;
import com.mdcreativo.backenduserapp.models.entities.User;

public class DtoMapperUser {

    private User user;
    private DtoMapperUser() {
    }

    public static DtoMapperUser builder() {
        return new DtoMapperUser();
    }

    public DtoMapperUser setUser(User user) {
        this.user = user;
        return this;
    }

    public UserDto build(){
        if (user == null) {
            throw new RuntimeException("Debe pasar el entity user");
        }
        return new UserDto(user.getId(), user.getUsername(),user.getEmail());
    }
}
