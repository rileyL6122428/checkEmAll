package com.manifest.todo.server.jsonmarshaltargets;

public class NewTodoData {
	private String name;
	private String description;
	private boolean finished;
	private String type;
	private long userId;
	
	public String getName() {
		return name;
	}
	
	public String getDescription() {
		return description;
	}
	
	public boolean isFinished() {
		return finished;
	}
	
	public String getType() {
		return type;
	}
	
	public long getUserId() {
		return userId;
	}
	
}
