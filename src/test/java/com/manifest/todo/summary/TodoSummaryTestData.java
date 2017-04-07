package com.manifest.todo.summary;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.manifest.todo.server.model.Todo;

public class TodoSummaryTestData {
	
	private static String[] todoTypes = new String[]{ "work", "exercise", "family" };
	private static int[] dates = new int[]{ 20, 40, 60, 80, 100 };
	private static boolean[] finishedFlags = new boolean[]{ true, false };
	
	public static final List<Todo> TODOS = new ArrayList<Todo>(){
		{
			for(String todoType: todoTypes) {
				for(int date : dates) {
					for(boolean finished : finishedFlags) {
						addNewTodo(date, todoType, finished);
					}
				}
			}	
		}
		
		private void addNewTodo(int dateInt, String todoType, boolean finished) {
			add(new Todo(){{
				setDateCreated(new Date(dateInt));
				setType(todoType);
				setFinished(finished);
			}});
		}
	};
}
