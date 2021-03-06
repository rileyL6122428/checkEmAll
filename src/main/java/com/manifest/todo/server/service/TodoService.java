package com.manifest.todo.server.service;

import java.util.Date;
import java.util.List;

import javax.ws.rs.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manifest.todo.server.jsonmarshaltargets.NewTodoData;
import com.manifest.todo.server.jsonmarshaltargets.UpdateTodoData;
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
	
	public List<Todo> getQueuedTodos(long userId) throws NotFoundException {
		User user = userRepository.findOne(userId);
		
		if(user == null) {
			throw new NotFoundException("Could not find the provided user.");
		} else {
			return todoRepository.findByUserAndQueued(user, true);						
		}	
	}
	
	public List<Todo> getAllTodos(long userId) {
		User user = userRepository.findOne(userId);
		
		if(user == null) {
			throw new NotFoundException("Could not find the provided user.");
		} else {
			return todoRepository.findByUser(user);						
		}
	}
	
	public Todo createTodo(NewTodoData todoData) {
		User user = userRepository.findOne(todoData.getUserId());
		
		Todo todo = new Todo();
		todo.setUser(user);
		todo.setDescription(todoData.getDescription());
		todo.setFinished(todoData.isFinished());
		todo.setName(todoData.getName());
		todo.setType(todoData.getType());
		todo.setDateCreated(new Date());
		todo.setQueued(true);
		
		return todoRepository.save(todo);
	}

	public Todo updateTodo(UpdateTodoData updateTodoData) {
		Todo todo = todoRepository.findOne(updateTodoData.getId());
		
		todo.setName(updateTodoData.getName());
		todo.setType(updateTodoData.getType());
		todo.setFinished(updateTodoData.isFinished());
		todo.setDescription(updateTodoData.getDescription());
		todo.setQueued(updateTodoData.isQueued());
		
		return todoRepository.save(todo);
	}

	
}
