package com.GG.GG.controller;
import com.GG.GG.model.User;
import com.GG.GG.repository.UserRepo;
import com.GG.GG.services.JwtService;
import com.GG.GG.services.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class SecCtrl {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailService userDetailService;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        System.out.println("Login called");

        // 🔹 Check if user exists in DB
        User dbUser = userRepo.findByUsername(user.getUsername());
        if (dbUser==null) {
            System.out.println("User not found");
            return "User not found";
        }

        // 🔹 Authenticate using Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getUsername());
        } else {
            System.out.println("Authentication failed");
            return "Authentication failed";
        }
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        // 🔹 Check if email already exists

        // 🔹 Hash the password before saving (using strength 10)
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User registered successfully";
    }
    @GetMapping("/hello")
    public String hello() {
        return "Hello World!";
    }
}
