package com.manifest.todo.server.jsonmarshaltargets;

public class UpdateTodoData {
	private long id;
	private boolean finished;

	public boolean isFinished() {
		return finished;
	}

	public void setFinished(boolean finished) {
		this.finished = finished;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
}
