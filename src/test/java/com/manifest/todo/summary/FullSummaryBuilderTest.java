package com.manifest.todo.summary;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import static org.mockito.Mockito.*;

public class FullSummaryBuilderTest {

	private DateUtil dateUtil;
	private FullSummaryBuilder summaryBuilder;
	
	@Before
	public void setup() {
		dateUtil = mock(DateUtil.class);
		summaryBuilder = new FullSummaryBuilder(dateUtil);
	}
	
	@Ignore
	@Test
	public void buildSummary__aquiresPeriodicSumarryForThePastWeek() {
		fail("Not yet implemented");
	}

}
