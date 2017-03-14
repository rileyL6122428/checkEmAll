package com.manifest.todo.server.resourceconfig;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.servlet.ServletProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.manifest.todo.server.endpoint.TodoEndpoint;
import com.manifest.todo.server.endpoint.TodoTypeEndpoint;
import com.manifest.todo.server.endpoint.UserEndpoint;

@Configuration
public class JerseyConfig extends ResourceConfig {

	public JerseyConfig() {
		registerEndpoints();
        property(ServletProperties.FILTER_FORWARD_ON_404, true);
	}
	
	private void registerEndpoints() {
		register(TodoEndpoint.class);
		register(TodoTypeEndpoint.class);
		register(UserEndpoint.class);
	}
}
