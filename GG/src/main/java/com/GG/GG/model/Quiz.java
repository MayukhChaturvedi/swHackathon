package com.GG.GG.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Quiz {
    @Id
        private Long id;
        private String question;
        private String description;
        private Map<String, String> answers;

        @JsonProperty("multiple_correct_answers")
        private boolean multipleCorrectAnswers;

        @JsonProperty("correct_answers")
        private Map<String, String> correctAnswers;

        @JsonProperty("correct_answer")
        private String correctAnswer;

        private String explanation;
        private String category;
        private String difficulty;

        // Getters and Setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getQuestion() {
            return question;
        }

        public void setQuestion(String question) {
            this.question = question;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Map<String, String> getAnswers() {
            return answers;
        }

        public void setAnswers(Map<String, String> answers) {
            this.answers = answers;
        }

        public boolean isMultipleCorrectAnswers() {
            return multipleCorrectAnswers;
        }

        public void setMultipleCorrectAnswers(boolean multipleCorrectAnswers) {
            this.multipleCorrectAnswers = multipleCorrectAnswers;
        }

        public Map<String, String> getCorrectAnswers() {
            return correctAnswers;
        }

        public void setCorrectAnswers(Map<String, String> correctAnswers) {
            this.correctAnswers = correctAnswers;
        }

        public String getCorrectAnswer() {
            return correctAnswer;
        }

        public void setCorrectAnswer(String correctAnswer) {
            this.correctAnswer = correctAnswer;
        }

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }







        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getDifficulty() {
            return difficulty;
        }

        public void setDifficulty(String difficulty) {
            this.difficulty = difficulty;
        }

}
