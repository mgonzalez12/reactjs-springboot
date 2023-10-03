package com.mdcreativo.backenduserapp.models;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequest  implements  IUser {

    @NotBlank()
    private String username;

    @NotBlank
    @Email
    private String email;

    private boolean admin;

    @Override
    public  boolean isAdmin() {
        return admin;
    }
}
