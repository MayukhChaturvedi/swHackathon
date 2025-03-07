package com.GG.GG.services;

import com.GG.GG.model.User;
import com.GG.GG.model.UserPrincipal;
import com.GG.GG.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo repo; // Injects the User Repository

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = repo.findByUsername(email); // Fetch user by email instead of username

        if (user==null) {
            System.out.println("User not found with email: " + email);
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        return new UserPrincipal(user); // Wrap user in UserPrincipal
    }
}
