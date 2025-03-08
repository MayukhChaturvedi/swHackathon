package com.GG.GG.service;

import com.GG.GG.model.Networking;
import com.GG.GG.model.Quiz;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class QuizService {
    @Value("${quiz.api.url}")  // Fetch API URL from properties
    private String apiUrl;

    @Value("${quiz.api.key}")  // Fetch API key from properties
    private String apiKey;
    private final RestTemplate restTemplate;


    public QuizService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    public List<Quiz> fetchQuizQuestions(Networking networking, int limit, String category) {
        int easyCount, mediumCount, hardCount;

        if (networking == null) {
            // New user → default to easy
            easyCount = 10;
            mediumCount = 0;
            hardCount = 0;
        } else {
            // Calculate accuracy for each difficulty
            double easyAccuracy = getAccuracy(networking.getCorrectEasy(), networking.getTotalEasy());
            double mediumAccuracy = getAccuracy(networking.getCorrectMedium(), networking.getTotalMedium());
            double hardAccuracy = getAccuracy(networking.getCorrectHard(), networking.getTotalHard());

            // Distribute 10 questions based on past accuracy
            easyCount = getQuestionCount(easyAccuracy, 4, 3, 2);
            mediumCount = getQuestionCount(mediumAccuracy, 3, 4, 3);
            hardCount = getQuestionCount(hardAccuracy, 1, 3, 5);
        }

        // Fetch questions from API
        List<Quiz> questions = new ArrayList<>();
        questions.addAll(fetchQuestionsFromAPI(category, "easy", easyCount));
        questions.addAll(fetchQuestionsFromAPI(category, "medium", mediumCount));
        questions.addAll(fetchQuestionsFromAPI(category, "hard", hardCount));

        // Shuffle to mix difficulties
        Collections.shuffle(questions);

        return questions;
    }

    // Helper to calculate accuracy (avoid division by zero)
    private double getAccuracy(int correct, int total) {
        return (total == 0) ? 0 : (correct * 100.0) / total;
    }

    // Determine question distribution based on accuracy
    private int getQuestionCount(double accuracy, int low, int mid, int high) {
        if (accuracy <= 40) return low;    // Weak in this level → More easy questions
        if (accuracy > 40 && accuracy <= 70) return mid; // Moderate → Balanced
        return high;  // Strong → More hard questions
    }

    // Fetch questions from API
    private List<Quiz> fetchQuestionsFromAPI(String category, String difficulty, int count) {
        if (count == 0) return new ArrayList<>();

        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("apiKey", apiKey)
                .queryParam("limit", count)
                .queryParam("category", category)
                .queryParam("difficulty", difficulty)
                .toUriString();

        ResponseEntity<Quiz[]> response = restTemplate.getForEntity(url, Quiz[].class);
        return Arrays.asList(response.getBody());
    }
}
