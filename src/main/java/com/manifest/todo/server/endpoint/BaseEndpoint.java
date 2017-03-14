package com.manifest.todo.server.endpoint;

import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;

public class BaseEndpoint {
	protected Response errorResponse(NotFoundException exception) {
		return Response.status(404)
						.entity(exception)
						.build();
	}
}
