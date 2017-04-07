package com.manifest.todo.summary;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.common.collect.Range;
import com.manifest.todo.server.model.Todo;

public class PeriodSummary {
	
	private Map<String, Integer> finishedTodoCounts;
	private Map<String, Integer> unfinishedTodoCounts;
		
	public static PeriodSummary createNew(List<Todo> todos, Range<Date> period) {
		PeriodSummary todoSummary = new PeriodSummary(){{
			setFinishedTodosImpl(new HashMap<String, Integer>());
			setUnfinshedTodosImpl(new HashMap<String, Integer>());
		}};
		
		todos.stream().forEach(todoSummary::initializeCountForType);
		
		todos.stream().forEach((todo) -> {
			if(period.contains(todo.getDateCreated()))	
				todoSummary.incrementTodoCounts(todo);
		});
		
		return todoSummary;
	}
	
	private void initializeCountForType(Todo todo) {
		finishedTodoCounts.put(todo.getType(), 0);
		unfinishedTodoCounts.put(todo.getType(), 0);
	}

	private void incrementTodoCounts(Todo todo) {
		Map<String, Integer> todos = (todo.isFinished()) ? finishedTodoCounts : unfinishedTodoCounts;
		String type = todo.getType();
		todos.put(type, todos.get(type) + 1);
	}
	
	void setFinishedTodosImpl(Map<String, Integer> finishedTodos) {
		this.finishedTodoCounts = finishedTodos;
	}
	
	void setUnfinshedTodosImpl(Map<String, Integer> unfinshedTodos) {
		this.unfinishedTodoCounts = unfinshedTodos;
	}

	public Object getFinishedCount(String todoType) {
		return finishedTodoCounts.get(todoType);
	}

	public Object getUnfinishedCount(String todoType) {
		return unfinishedTodoCounts.get(todoType);
	}
}
