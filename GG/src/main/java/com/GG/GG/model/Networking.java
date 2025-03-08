package com.GG.GG.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Networking {

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
@Id
    private int id;
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getTotalHard() {
        return totalHard;
    }

    public void setTotalHard(int totalHard) {
        this.totalHard = totalHard;
    }

    public int getTotalMedium() {
        return totalMedium;
    }

    public void setTotalMedium(int totalMedium) {
        this.totalMedium = totalMedium;
    }

    public int getTotalEasy() {
        return totalEasy;
    }

    public void setTotalEasy(int totalEasy) {
        this.totalEasy = totalEasy;
    }

    public int getCorrectHard() {
        return correctHard;
    }

    public void setCorrectHard(int correctHard) {
        this.correctHard = correctHard;
    }

    public int getCorrectMedium() {
        return correctMedium;
    }

    public void setCorrectMedium(int correctMedium) {
        this.correctMedium = correctMedium;
    }

    public int getCorrectEasy() {
        return correctEasy;
    }

    public void setCorrectEasy(int correctEasy) {
        this.correctEasy = correctEasy;
    }

    private int totalHard;
    private int totalMedium;
    private int totalEasy;
    private int correctHard;
    private int correctMedium;
    private int correctEasy;

}
