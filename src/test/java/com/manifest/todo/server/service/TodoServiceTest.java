package com.manifest.todo.server.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyBoolean;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.NotFoundException;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;

import com.manifest.todo.server.jsonmarshaltargets.NewTodoData;
import com.manifest.todo.server.jsonmarshaltargets.UpdateTodoData;
import com.manifest.todo.server.model.Todo;
import com.manifest.todo.server.model.User;
import com.manifest.todo.server.repository.TodoRepository;
import com.manifest.todo.server.repository.UserRepository;

public class TodoServiceTest {
	
	private TodoService todoService;
	private TodoRepository todoRepository;
	private UserRepository userRepository;
	private User user;
	private NewTodoData newTodoData;
	
	@Before
	public void setup() {
		todoRepository = mock(TodoRepository.class);
		newTodoData = mock(NewTodoData.class);
		userRepository = mock(UserRepository.class);
		user = mock(User.class);
		todoService = new TodoService(todoRepository, userRepository);
	}
	
	@Test
	public void getTodos_userRepoReturnsUser_searchAndReturnsTodosFromTodoRepo() {
		User user = new User(){{ setId(1); setUsername("MOCK_USERNAME"); }};
		when(userRepository.findOne(anyLong())).thenReturn(user);
		
		List<Todo> todos = new ArrayList<Todo>();
		todos.add(new Todo(){{ setId(1); }});
		todos.add(new Todo(){{ setId(2); }});
		when(todoRepository.findByUser(any())).thenReturn(todos);
		
		List<Todo> returnedTodos = todoService.getTodos(user.getId());
		
		verify(userRepository).findOne(user.getId());
		verify(todoRepository).findByUser(user);
		assertEquals(todos, returnedTodos);
	}
	
	@Test(expected=NotFoundException.class)
	public void getTodos_userRepoReturnsNull_throwsNotFoundException() {
		when(userRepository.findOne(anyLong())).thenThrow(NotFoundException.class);
		todoService.getTodos(1);
	}
	
	@Test
	public void createTodo__instantiatesAndPassesATodoToTheTodoRepo() {
		when(newTodoData.getDescription()).thenReturn("MOCK_DESCRIPTION");
		when(newTodoData.isFinished()).thenReturn(true);
		when(newTodoData.getName()).thenReturn("MOCK_NAME");
		when(newTodoData.getUserId()).thenReturn(1l);
		
		when(userRepository.findOne(anyLong())).thenReturn(user);
		
		Todo persistedTodo = new Todo();
		ArgumentCaptor<Todo> newTodoCaptor = ArgumentCaptor.forClass(Todo.class);
		when(todoRepository.save(newTodoCaptor.capture())).thenReturn(persistedTodo);

		
		Todo returnedTodo = todoService.createTodo(newTodoData);
		
		
		Todo newTodo = newTodoCaptor.getValue();
		assertEquals(newTodoData.getDescription(), newTodo.getDescription());
		assertEquals(newTodoData.getName(), newTodo.getName());
		assertEquals(newTodoData.isFinished(), newTodo.isFinished());
		assertEquals(user, newTodo.getUser());
		
		assertEquals(persistedTodo, returnedTodo);
	}
	
	@Test
	public void updateTodo__updatesExistingTodoWithProvidedData() {
		UpdateTodoData updateTodoData = mock(UpdateTodoData.class);
		when(updateTodoData.getId()).thenReturn(1l);
		when(updateTodoData.isFinished()).thenReturn(false);
		
		Todo todo = mock(Todo.class);
		doNothing().when(todo).setFinished(anyBoolean());
		
		when(todoRepository.findOne(anyLong())).thenReturn(todo);
		when(todoRepository.save(any(Todo.class))).thenReturn(todo);
		
		Todo returnedTodo = todoService.updateTodo(updateTodoData);
		
		verify(todoRepository).findOne(1l);
		verify(todo).setFinished(false);
		verify(todoRepository).save(todo);
		assertEquals(todo, returnedTodo);
	}
}
