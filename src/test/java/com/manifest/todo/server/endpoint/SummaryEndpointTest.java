package com.manifest.todo.server.endpoint;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import static org.mockito.Mockito.*;

import com.google.common.collect.Range;
import com.manifest.todo.server.service.SummaryService;

import javax.ws.rs.core.Response;

public class SummaryEndpointTest {
	
	private SummaryEndpoint summaryEndpoint;
	private SummaryService summaryService;
	
	@Before
	public void setup() {
		summaryService = mock(SummaryService.class);
		summaryEndpoint = new SummaryEndpoint(summaryService);
	}
	
	
	@Test
	public void index_serviceReturnsNull_return404() {
		long userId = 1;
		Range<Date> period = Range.closed(new Date(0), new Date(100));
		when(summaryService.getSummary(userId, period)).thenReturn(null);
		
		Response response = summaryEndpoint.index(userId, period);
		assertEquals(404, response.getStatus());
		assertEquals("A user could not be fount with the supplied id", (String)response.getEntity());
	}
	
	@Ignore
	@Test
	public void index_serviceReturnsSummary_returnSummary() {
		fail("Not yet implemented");
	}

}
