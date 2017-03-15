package com.manifest.todo.server.service;

import java.util.List;

import javax.ws.rs.NotFoundException;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manifest.todo.server.model.Todo;
import com.manifest.todo.server.model.User;
import com.manifest.todo.server.repository.TodoRepository;
import com.manifest.todo.server.repository.UserRepository;

@Service
public class TodoService {
	
	private UserRepository userRepository;
	private TodoRepository todoRepository;
	
	@Autowired
	public TodoService (TodoRepository todoRepository, UserRepository userRepository) {
		this.todoRepository = todoRepository;
		this.userRepository = userRepository;
	}
	
	public List<Todo> getTodos(long userId) throws NotFoundException {
		User user = userRepository.findOne(userId);
		
		if(user == null) {
			throw new NotFoundException("Could not find the provided user.");
		} else {
			return todoRepository.findByUser(user);			
		}	
	}
	
}
