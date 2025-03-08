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
        System.out.println("Fetching quiz questions for category: " + category + " with limit: " + limit);

        int easyCount, mediumCount, hardCount;

        if (networking == null) {
            System.out.println("No past data found for user. Assigning default difficulty distribution.");
            easyCount = 10;
            mediumCount = 0;
            hardCount = 0;
        } else {
            // Calculate accuracy for each difficulty
            double easyAccuracy = getAccuracy(networking.getCorrectEasy(), networking.getTotalEasy());
            double mediumAccuracy = getAccuracy(networking.getCorrectMedium(), networking.getTotalMedium());
            double hardAccuracy = getAccuracy(networking.getCorrectHard(), networking.getTotalHard());

            System.out.println("User Accuracy Levels: Easy=" + easyAccuracy + "%, Medium=" + mediumAccuracy + "%, Hard=" + hardAccuracy + "%");

            // Distribute 10 questions based on past accuracy
            easyCount = getQuestionCount(easyAccuracy, 4, 3, 2);
            mediumCount = getQuestionCount(mediumAccuracy, 3, 4, 3);
            hardCount = getQuestionCount(hardAccuracy, 1, 3, 5);

            System.out.println("Question Distribution: Easy=" + easyCount + ", Medium=" + mediumCount + ", Hard=" + hardCount);
        }

        // Fetch questions from API
        List<Quiz> questions = new ArrayList<>();
        questions.addAll(fetchQuestionsFromAPI(category, "easy", easyCount));
        questions.addAll(fetchQuestionsFromAPI(category, "medium", mediumCount));
        questions.addAll(fetchQuestionsFromAPI(category, "hard", hardCount));

        System.out.println("Total Questions Fetched Before Shuffling: " + questions.size());

        // Shuffle to mix difficulties
        Collections.shuffle(questions);
        System.out.println("Questions shuffled. Final question count: " + questions.size());

        return questions;
    }

    // Helper to calculate accuracy (avoid division by zero)
    private double getAccuracy(int correct, int total) {
        double accuracy = (total == 0) ? 0 : (correct * 100.0) / total;
        System.out.println("Calculating Accuracy: Correct=" + correct + ", Total=" + total + " -> Accuracy=" + accuracy + "%");
        return accuracy;
    }

    // Determine question distribution based on accuracy
    private int getQuestionCount(double accuracy, int low, int mid, int high) {
        int questionCount;
        if (accuracy <= 40) {
            questionCount = low;
        } else if (accuracy > 40 && accuracy <= 70) {
            questionCount = mid;
        } else {
            questionCount = high;
        }
        System.out.println("Assigned Question Count Based on Accuracy (" + accuracy + "%): " + questionCount);
        return questionCount;
    }

    // Fetch questions from API
    private List<Quiz> fetchQuestionsFromAPI(String category, String difficulty, int count) {
        if (count == 0) {
            System.out.println("Skipping API call for " + difficulty + " difficulty as count is 0.");
            return new ArrayList<>();
        }

        String url = UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("apiKey", apiKey)
                .queryParam("limit", count)
                .queryParam("category", category)
                .queryParam("difficulty", difficulty)
                .toUriString();

        System.out.println("Fetching " + count + " " + difficulty + " questions from API: " + url);

        ResponseEntity<Quiz[]> response = restTemplate.getForEntity(url, Quiz[].class);
        List<Quiz> quizList = Arrays.asList(response.getBody());

        System.out.println("Received " + quizList.size() + " questions from API for difficulty: " + difficulty);

        return quizList;
    }
}
