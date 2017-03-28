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
	
	@Before
	public void setup() {
		todoService = mock(TodoService.class);
		todoEndpoint = new TodoEndpoint(todoService);
	}
	
	@Test
	public void index_todosListReturnedFromService_sendsTodos() {
		List<Todo> todos = new ArrayList<Todo>();
		todos.add(new Todo(){{ setId(1); }}); 
		todos.add(new Todo(){{ setId(2); }});
		when(todoService.getTodos(anyLong())).thenReturn(todos);
		
		Response response = todoEndpoint.index((long)1);
		
		List<Todo> sentTodos = (List<Todo>)response.getEntity();
		assertEquals(2, sentTodos.size());
		assertEquals(todos.get(0), sentTodos.get(0));
		assertEquals(todos.get(1), sentTodos.get(1));
		assertEquals(200, response.getStatus());
	}
	
	@Test
	public void index_todosListThrowsNotFoundException_sendsErrorMessage() {
		NotFoundException notFoundException = new NotFoundException("MOCK EXCEPTION");
		when(todoService.getTodos(anyLong())).thenThrow(notFoundException);
		
		Response response = todoEndpoint.index((long)1);
		
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
