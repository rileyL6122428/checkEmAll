package com.manifest.todo.server.endpoint;

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;

import org.junit.Before;
import org.junit.Test;

import com.manifest.todo.server.model.User;
import com.manifest.todo.server.service.UserService;

public class UserEndpointTest {
	
	private UserEndpoint userEndpoint;
	private UserService userService;
	
	@Before
	public void setup() {
		userService = mock(UserService.class);
		userEndpoint = new UserEndpoint(userService);
	}
	
	@Test
	public void show_userServiceReturnsUser_endpointReturnsUser() {
		User user = new User();
		when(userService.getUser(anyString())).thenReturn(user);
		
		Response response = userEndpoint.show("MOCK_USERNAME");
		
		verify(userService).getUser("MOCK_USERNAME");
		assertEquals(200, response.getStatus());
		assertEquals(user, response.getEntity());
	}
	
	@Test
	public void show_userServiceReturnsNull_endpointReturnsException() {
		when(userService.getUser(anyString())).thenReturn(null);
		
		Response response = userEndpoint.show("MOCK_USERNAME");
		
		verify(userService).getUser("MOCK_USERNAME");
		assertEquals(404, response.getStatus());
		
		NotFoundException exception = (NotFoundException)response.getEntity();
		assertEquals("Could not find user with name: MOCK_USERNAME", exception.getMessage());
	}

}
