package com.manifest.todo.summary;

import static com.manifest.todo.summary.TodoSummaryTestData.TODOS;
import static org.junit.Assert.assertEquals;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;

import com.google.common.collect.Range;

public class PeriodSummaryTest {
	
	private Range<Date> period;
	private PeriodSummary summary;
	
	
	@Before
	public void setup() {
		
	}
	
	@Test
	public void createNew_allTodosInDateRange_calculatesAccurateTotals() {
		period = Range.closed(new Date(0), new Date(120));
		summary = PeriodSummary.createNew(TODOS, period);
		
		assertEquals(5, summary.getFinishedCount("work"));
		assertEquals(5, summary.getFinishedCount("exercise"));
		assertEquals(5, summary.getFinishedCount("family"));
		
		assertEquals(5, summary.getUnfinishedCount("work"));
		assertEquals(5, summary.getUnfinishedCount("exercise"));
		assertEquals(5, summary.getUnfinishedCount("family"));
	}
	
	@Test
	public void createNew_someTodosInDateRange_calculatesAccurateTotals() {
		period = Range.closed(new Date(50), new Date(120));
		summary = PeriodSummary.createNew(TODOS, period);
		
		assertEquals(3, summary.getFinishedCount("work"));
		assertEquals(3, summary.getFinishedCount("exercise"));
		assertEquals(3, summary.getFinishedCount("family"));
		
		assertEquals(3, summary.getUnfinishedCount("work"));
		assertEquals(3, summary.getUnfinishedCount("exercise"));
		assertEquals(3, summary.getUnfinishedCount("family"));
	}
	
	@Test
	public void createNew_noTodosInDateRange_calculatesAccurateTotals() {
		period = Range.closed(new Date(110), new Date(120));
		summary = PeriodSummary.createNew(TODOS, period);
		
		assertEquals(0, summary.getFinishedCount("work"));
		assertEquals(0, summary.getFinishedCount("exercise"));
		assertEquals(0, summary.getFinishedCount("family"));
		
		assertEquals(0, summary.getUnfinishedCount("work"));
		assertEquals(0, summary.getUnfinishedCount("exercise"));
		assertEquals(0, summary.getUnfinishedCount("family"));
	}
}
