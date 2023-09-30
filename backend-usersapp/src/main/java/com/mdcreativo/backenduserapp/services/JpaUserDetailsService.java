package com.mdcreativo.backenduserapp.services;

import com.mdcreativo.backenduserapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<com.mdcreativo.backenduserapp.models.entities.User> o = userRepository.findByUsername(username);
        if (!o.isPresent()){
            throw new UsernameNotFoundException(String.format("usuario %s no existe en el sistema" + username));
        }

        com.mdcreativo.backenduserapp.models.entities.User  user = o.orElseThrow();

        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(r -> new SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toList());

        return new User(user.getUsername(),
                user.getPassword(),
                true,
                true,
                true,
                true,
                authorities);
    }
}
