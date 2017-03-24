package com.manifest.todo.server.endpoint;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.manifest.todo.server.jsonmarshaltargets.NewTodoData;
import com.manifest.todo.server.model.Todo;
import com.manifest.todo.server.service.TodoService;

@Controller
@Path("/api")
public class TodoEndpoint extends BaseEndpoint {
	
	private TodoService todoService;
	
	@Autowired
	public TodoEndpoint(TodoService todoService) {
		this.todoService = todoService;
	}
	
	@GET
	@Path("/todos")
	@Produces("application/json")
	public Response index(@QueryParam("userId") long userId) {
		try {
			List<Todo> userTodos = todoService.getTodos(userId); 
			return todosResponse(userTodos);
			
		} catch(NotFoundException notFoundException) {
			return errorResponse(notFoundException);
		}
	}
	
	@POST
	@Path("/todo")
	@Produces("application/json")
	public Response create(final NewTodoData todoFormData) {
		try {
			Todo todo = todoService.createTodo(todoFormData);			
			return Response.status(201).entity(todo).build();
		} catch(Exception e) {
			return Response.status(500).entity(e).build();
		}
		
	}
	
	private Response todosResponse(List<Todo> todos) {
		return Response.status(200)
						.entity(todos)
						.build();
	}
}
