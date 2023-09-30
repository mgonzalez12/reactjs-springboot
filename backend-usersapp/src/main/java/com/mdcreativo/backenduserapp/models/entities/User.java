package com.mdcreativo.backenduserapp.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank()
    //@Size(min = 4, max = 15)
    @Column(unique = true)
    private String username;

    @NotBlank
    private String password;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @ManyToMany
    @JoinTable(name = "users_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id"),
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "role_id"}))
    private List<Role> roles;
}
