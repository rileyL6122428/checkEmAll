package com.manifest.todo.server.endpoint;

import java.util.Date;

import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;

import com.google.common.collect.Range;
import com.manifest.todo.server.service.SummaryService;

public class SummaryEndpoint {

	private SummaryService summaryService;
	
	@Autowired
	public SummaryEndpoint(SummaryService summaryService) {
		this.summaryService = summaryService;
	}

	public Response index(long userId, Range<Date> period) {
//		TodoSummary summary = summaryService.getSummary(userId, period);
		return null;
	}

}
