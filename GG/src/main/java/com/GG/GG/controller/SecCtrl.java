package com.GG.GG.controller;
import com.GG.GG.model.Networking;
import com.GG.GG.model.Quiz;
import com.GG.GG.model.Sub;
import com.GG.GG.model.User;
import com.GG.GG.repository.NetworkingRepo;
import com.GG.GG.repository.UserRepo;
import com.GG.GG.service.QuizService;
import com.GG.GG.services.JwtService;
import com.GG.GG.services.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    private NetworkingRepo networkingRepo;

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
    @Autowired
    private QuizService quizService;

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
        if (userRepo.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already taken!");
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return "User registered successfully";
    }
    @GetMapping("/hello")
    public String hello() {
        return "Hello World!";
    }

    @GetMapping("/questions/{category}")
    public List<Quiz> getQuizQuestions(@RequestHeader("Authorization") String authHeader,
            @PathVariable String category,  // Get category from URL
            @RequestParam(defaultValue = "10") int limit) {
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);
        Optional<Networking> networkingOptional = networkingRepo.findByUsername(username);
        Networking networking = networkingOptional.orElse(null);

        return quizService.fetchQuizQuestions(networking,limit, category);
    }
    @PostMapping("/submit")
    public void submitQuiz(@RequestHeader("Authorization") String authHeader, @RequestBody List<Sub> answers) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header");
        }
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);

        // Debug: Print received username
        System.out.println("Extracted Username from Token: " + username);

        // Initialize counters
        int totalQuestions = answers.size();
        int correctCount = 0;
        int totalEasy = 0, totalMedium = 0, totalHard = 0;
        int correctEasy = 0, correctMedium = 0, correctHard = 0;

        // Debug: Print received answers
        System.out.println("Received Answers: " + answers);

        // Process answers
        for (Sub answer : answers) {
            String difficulty = answer.getDifficulty().toLowerCase();
            boolean isCorrect = answer.isCorrect();

            // Debug: Print processing values
            System.out.println("Processing Answer - Difficulty: " + difficulty + ", Correct: " + isCorrect);

            switch (difficulty) {
                case "easy":
                    totalEasy++;
                    if (isCorrect) correctEasy++;
                    break;
                case "medium":
                    totalMedium++;
                    if (isCorrect) correctMedium++;
                    break;
                case "hard":
                    totalHard++;
                    if (isCorrect) correctHard++;
                    break;
                default:
                    System.out.println("Unexpected difficulty value: " + difficulty);
                    break;
            }

            if (isCorrect) correctCount++;
        }

        // Fetch existing user stats or create a new one
        Optional<Networking> networkingOptional = networkingRepo.findByUsername(username);
        Networking networking = networkingOptional.orElse(new Networking(username, 0, 0, 0, 0, 0, 0));

        // Debug: Print before update
        System.out.println("Before Update - Networking Stats: " + networking);

        // Update user quiz stats
        networking.setTotalEasy(networking.getTotalEasy() + totalEasy);
        networking.setTotalMedium(networking.getTotalMedium() + totalMedium);
        networking.setTotalHard(networking.getTotalHard() + totalHard);

        networking.setCorrectEasy(networking.getCorrectEasy() + correctEasy);
        networking.setCorrectMedium(networking.getCorrectMedium() + correctMedium);
        networking.setCorrectHard(networking.getCorrectHard() + correctHard);

        // Debug: Print after update
        System.out.println("After Update - Networking Stats: " + networking);

        // Save updated stats
        networkingRepo.save(networking);
    }
}
