package com.GG.GG.service;

import com.GG.GG.model.Quiz;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Arrays;
import java.util.List;

@Service
public class QuizService {
    private final String API_URL = "https://quizapi.io/api/v1/questions";
    private final String API_KEY = "6wQ1fl3f9ZtJOcEJIZnudMGneeCFCksl0lEm0xMc";
    private final RestTemplate restTemplate;


    public QuizService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    public List<Quiz> fetchQuizQuestions(int limit, String category, String difficulty) {
        String url = UriComponentsBuilder.fromHttpUrl(API_URL)
                .queryParam("apiKey", API_KEY)
                .queryParam("limit", limit)
                .queryParam("category", category)
                .queryParam("difficulty", difficulty)
                .toUriString();

        ResponseEntity<Quiz[]> response = restTemplate.getForEntity(url, Quiz[].class);
        return Arrays.asList(response.getBody());
    }
}
