package com.manifest.todo.server.resourceconfig;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import com.manifest.todo.server.endpoint.TodoEndpoint;
import com.manifest.todo.server.endpoint.TodoTypeEndpoint;
import com.manifest.todo.server.endpoint.UserEndpoint;

@Component
public class JerseyConfig extends ResourceConfig {
	public JerseyConfig() {
		registerEndpoints();
	}
	
	private void registerEndpoints() {
		register(TodoEndpoint.class);
		register(TodoTypeEndpoint.class);
		register(UserEndpoint.class);
	}
}
