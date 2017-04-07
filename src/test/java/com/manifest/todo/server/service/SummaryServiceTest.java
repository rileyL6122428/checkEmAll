package com.manifest.todo.server.service;

import static com.manifest.todo.summary.TodoSummaryTestData.TODOS;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;

import com.google.common.collect.Range;
import com.manifest.todo.server.model.User;
import com.manifest.todo.server.repository.TodoRepository;
import com.manifest.todo.server.repository.UserRepository;
import com.manifest.todo.summary.PeriodSummary;

public class SummaryServiceTest {
	
	private UserRepository userRepository;
	private TodoRepository todoRepository;
	private SummaryService summaryService;
	
	@Before
	public void setup() {
		userRepository = mock(UserRepository.class);
		todoRepository = mock(TodoRepository.class);
		summaryService = new SummaryService(todoRepository, userRepository);
	}
	
	@Test
	public void getSummary_userExists_returnsASummaryObjectWithTheCorrectLifetimeData() {
		Range<Date> period = Range.closed(new Date(0), new Date(120));
		User user = new User();
		user.setId(1);
		when(userRepository.findOne(user.getId())).thenReturn(user);
		when(todoRepository.findByUser(user)).thenReturn(TODOS);
		
		PeriodSummary summary = summaryService.getSummary(user.getId(), period);
		
		assertEquals(5, summary.getFinishedCount("work"));
		assertEquals(5, summary.getFinishedCount("exercise"));
		assertEquals(5, summary.getFinishedCount("family"));
		
		assertEquals(5, summary.getUnfinishedCount("work"));
		assertEquals(5, summary.getUnfinishedCount("exercise"));
		assertEquals(5, summary.getUnfinishedCount("family"));
	}
	
	@Test
	public void getSummary_userDoesNotExist_returnsNull() {
		Range<Date> period = Range.closed(new Date(0), new Date(120));
		long userId = 1;
		when(userRepository.findOne(userId)).thenReturn(null);
		PeriodSummary summary = summaryService.getSummary(userId, period);
		assertNull(summary);
	}

}
