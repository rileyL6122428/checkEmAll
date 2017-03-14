package com.manifest.todo.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manifest.todo.server.model.User;
import com.manifest.todo.server.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public User getUser(String username) {
		return userRepository.findByUsername(username);
	}
}
