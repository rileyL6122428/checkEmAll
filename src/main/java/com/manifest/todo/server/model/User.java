package com.manifest.todo.server.model;

import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
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
