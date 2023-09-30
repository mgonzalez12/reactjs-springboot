package com.mdcreativo.backenduserapp.controllers;


import com.mdcreativo.backenduserapp.models.UserRequest;
import com.mdcreativo.backenduserapp.models.dto.UserDto;
import com.mdcreativo.backenduserapp.models.entities.User;
import com.mdcreativo.backenduserapp.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(originPatterns = "*")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<UserDto> list(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> show(@PathVariable Long id){
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /*
    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result) {
        return result.hasErrors() ? validation(result) : ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }
    */

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasErrors()) {return validation(result);}

        Optional<User> existingUser = service.findByUsername(user.getUsername());

        if (existingUser.isPresent()) {
            Map<String, String> error = new HashMap<>();
            error.put("username", "El nombre de usuario ya está en uso");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } else {
            UserDto savedUser = service.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody UserRequest user, BindingResult result, @PathVariable Long id) {
        return result.hasErrors() ? validation(result) :
                service.update(user, id)
                        .map(updatedUser -> ResponseEntity.status(HttpStatus.CREATED).body(updatedUser))
                        .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return service.findById(id)
                .map(user -> {
                    service.remove(id);
                    return ResponseEntity.noContent().build(); // 204
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private ResponseEntity<?> validation(BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = result.getFieldErrors().stream()
                    .collect(Collectors.toMap(
                            FieldError::getField,
                            err -> "El campo " + err.getField() + " " + err.getDefaultMessage()
                    ));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
        } else {
            return ResponseEntity.status(HttpStatus.OK).build(); // Puedes cambiar esto a otro estado si lo deseas
        }
    }

}
