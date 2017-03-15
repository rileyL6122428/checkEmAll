package com.manifest.todo.server.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.manifest.todo.server.model.Todo;
import com.manifest.todo.server.model.User;

@Repository
public interface TodoRepository extends CrudRepository<Todo, Long>{
	public List<Todo> findByUser(User user);
}
