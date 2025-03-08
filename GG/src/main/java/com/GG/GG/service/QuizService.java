package com.GG.GG.service;

import com.GG.GG.model.Quiz;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
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
    public List<Quiz> fetchQuizQuestions(int limit, String category, String difficulty) {
        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("apiKey", apiKey)
                .queryParam("limit", limit)
                .queryParam("category", category)
                .queryParam("difficulty", difficulty)
                .toUriString();

        ResponseEntity<Quiz[]> response = restTemplate.getForEntity(url, Quiz[].class);
        return Arrays.asList(response.getBody());
    }
}
