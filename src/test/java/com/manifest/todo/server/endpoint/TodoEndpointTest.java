package com.manifest.todo.server.endpoint;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import com.manifest.todo.server.jsonmarshaltargets.NewTodoData;
import com.manifest.todo.server.jsonmarshaltargets.UpdateTodoData;
import com.manifest.todo.server.model.Todo;
import com.manifest.todo.server.service.TodoService;

public class TodoEndpointTest {
	
	private TodoEndpoint todoEndpoint;
	private TodoService todoService;
	
	private List<Todo> userTodos;
	
	@Before
	public void setup() {
		userTodos = new ArrayList<Todo>();
		userTodos.add(new Todo(){{ setId(1); }}); 
		userTodos.add(new Todo(){{ setId(2); }});
		
		todoService = mock(TodoService.class);
		todoEndpoint = new TodoEndpoint(todoService);
	}
	
	@Test
	public void index_queuedOnlyAndTodosListReturnedFromService_sendsTodos() {
		when(todoService.getQueuedTodos(anyLong())).thenReturn(userTodos);
		
		long userId = 1;
		boolean queuedOnly = true;
		Response response = todoEndpoint.index(userId, queuedOnly);
		
		List<Todo> sentTodos = (List<Todo>)response.getEntity();
		assertEquals(2, sentTodos.size());
		assertEquals(userTodos.get(0), sentTodos.get(0));
		assertEquals(userTodos.get(1), sentTodos.get(1));
		assertEquals(200, response.getStatus());
	}
	
	@Test
	public void index_allTodosAndTodosListReturnedFromService_sendsTodos() {
		when(todoService.getAllTodos(anyLong())).thenReturn(userTodos);
		
		long userId = 1;
		boolean queuedOnly = false;
		Response response = todoEndpoint.index(userId, queuedOnly);
		
		List<Todo> sentTodos = (List<Todo>)response.getEntity();
		assertEquals(2, sentTodos.size());
		assertEquals(userTodos.get(0), sentTodos.get(0));
		assertEquals(userTodos.get(1), sentTodos.get(1));
		assertEquals(200, response.getStatus());
	}
	
	@Test
	public void index_aueuedOnlyAndTodosListThrowsNotFoundException_sendsErrorMessage() {
		NotFoundException notFoundException = new NotFoundException("MOCK EXCEPTION");
		when(todoService.getQueuedTodos(anyLong())).thenThrow(notFoundException);
		
		long userId = 1;
		boolean queuedOnly = true;
		Response response = todoEndpoint.index(userId, queuedOnly);
		
		NotFoundException sentError = (NotFoundException)response.getEntity();
		assertEquals(notFoundException, sentError);
		assertEquals(404, response.getStatus());
	}
	
	@Test
	public void create_todoServiceCreatesATodo_sendsTodo() {
		NewTodoData todoFormData = mock(NewTodoData.class);
		Todo todo = mock(Todo.class);
		when(todoService.createTodo(any())).thenReturn(todo);
		
		Response response = todoEndpoint.create(todoFormData);
		
		verify(todoService).createTodo(todoFormData);
		assertEquals((Todo)response.getEntity(), todo);
		assertEquals(201, response.getStatus());
	}
	
	@Test
	public void create_todoServiceThrows_sendsError() {
		NewTodoData todoFormData = mock(NewTodoData.class);
		RuntimeException exception = new RuntimeException("MOCK_MESSAGE");
		when(todoService.createTodo(any())).thenThrow(exception);
		
		Response response = todoEndpoint.create(todoFormData);
		
		assertEquals(exception, (RuntimeException)response.getEntity());
		assertEquals(500, response.getStatus());
	}
	
	@Test
	public void update_todoServiceReturnsTodo_sendsTodo() {
		UpdateTodoData updateTodoData = mock(UpdateTodoData.class);
		Todo todo = mock(Todo.class);
		when(todoService.updateTodo(any(UpdateTodoData.class))).thenReturn(todo);
		
		Response response = todoEndpoint.update(updateTodoData);
		
		verify(todoService).updateTodo(updateTodoData);
		assertEquals((Todo)response.getEntity(), todo);
		assertEquals(200, response.getStatus());
	}
	
	@Test
	public void update_todoServiceThrows_sendsError() {
		UpdateTodoData updateTodoData = mock(UpdateTodoData.class);
		RuntimeException exception = new RuntimeException("MOCK_MESSAGE");
		when(todoService.updateTodo(any())).thenThrow(exception);
		
		Response response = todoEndpoint.update(updateTodoData);
		
		assertEquals(exception, (RuntimeException)response.getEntity());
		assertEquals(500, response.getStatus());
	}
}
