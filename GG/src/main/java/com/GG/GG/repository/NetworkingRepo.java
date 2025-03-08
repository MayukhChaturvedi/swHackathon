package com.GG.GG.repository;

import com.GG.GG.model.Networking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NetworkingRepo extends JpaRepository<Networking,String> {
    Optional<Networking> findByUsername(String username);
}
