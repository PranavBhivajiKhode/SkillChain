package com.pranav_khode.user_management_service.database;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, UUID>{

}
