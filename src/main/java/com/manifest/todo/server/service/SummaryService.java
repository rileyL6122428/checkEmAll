package com.manifest.todo.server.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.google.common.collect.Range;
import com.manifest.todo.server.model.Todo;
import com.manifest.todo.server.model.User;
import com.manifest.todo.server.repository.TodoRepository;
import com.manifest.todo.server.repository.UserRepository;
import com.manifest.todo.summary.PeriodSummary;

public class SummaryService {

	private UserRepository userRepository;
	private TodoRepository todoRepository;
	
	@Autowired
	public SummaryService(TodoRepository todoRepository, UserRepository userRepository) {
		this.todoRepository = todoRepository;
		this.userRepository = userRepository;
	}

	public PeriodSummary getSummary(long id, Range<Date> period) {
		User user = userRepository.findOne(id);
		if(user == null) return null;
		
		List<Todo> todos = todoRepository.findByUser(user);
		PeriodSummary summary = PeriodSummary.createNew(todos, period);
		
		return summary;
	}

}
