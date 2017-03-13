package com.manifest.todo.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.manifest.todo.server.model.User;

public interface UserRepository extends CrudRepository<User, Long> {

}
