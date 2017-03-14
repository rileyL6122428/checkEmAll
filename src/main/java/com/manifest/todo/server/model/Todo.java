package com.manifest.todo.server.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Todo {
	@Id
	private
	long id;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
}
