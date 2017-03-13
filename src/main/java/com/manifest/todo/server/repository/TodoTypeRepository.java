package com.manifest.todo.server.repository;

import org.springframework.data.repository.CrudRepository;

import com.manifest.todo.server.model.TodoType;

public interface TodoTypeRepository extends CrudRepository<TodoType, Long>{

}
