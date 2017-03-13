package com.manifest.todo.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.manifest.todo.server.model.Todo;

public interface TodoRepository extends CrudRepository<Todo, Long>{

}
