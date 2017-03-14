package com.manifest.todo.server.endpoint;

import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.manifest.todo.server.model.User;
import com.manifest.todo.server.service.UserService;

@Controller
@Provider
@Path("/api")
public class UserEndpoint extends BaseEndpoint {
	
	private UserService userService;
	
	@Autowired
	public UserEndpoint(UserService userService) {
		this.userService = userService;
	}
	
	@GET
	@Path("/user")
	@Produces("application/json")
	public Response show(@QueryParam("username") String username) {
		User user = userService.getUser(username);
		
		if(user != null) {
			return userResponse(user);
		} else {
			return errorResponse(new NotFoundException("Could not find user with name: " + username));
		}		
	}
	
	private Response userResponse(User user) {
		return Response.status(200)
						.entity(user)
						.build();
	}
		
}
