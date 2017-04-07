package com.manifest.todo.summary;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.manifest.todo.server.model.Todo;

public class FullSummaryTestData {
	static final int[] WEEKS = new int[]{
		0,
		DateUtil.ONE_WEEK,
		DateUtil.ONE_WEEK * 2,
		DateUtil.ONE_WEEK * 3,
		DateUtil.ONE_WEEK * 4,
		DateUtil.ONE_WEEK * 5,
		DateUtil.ONE_WEEK * 6,
		DateUtil.ONE_WEEK * 7,
		DateUtil.ONE_WEEK * 8,
		DateUtil.ONE_WEEK * 9
	};
	
	static final String[] TODO_TYPES = new String[]{ "work", "chore" };
	
	static final boolean[] FINISHED_FLAGS = new boolean[] { true, false };
	
	public static final List<Todo>TODOS = new ArrayList<Todo>(){{
		for(int date : WEEKS) {
			for(String type: TODO_TYPES) {
				
			}
		}
	}};
}
