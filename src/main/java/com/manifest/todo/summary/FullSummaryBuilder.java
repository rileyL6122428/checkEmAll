package com.manifest.todo.summary;

import org.springframework.beans.factory.annotation.Autowired;

public class FullSummaryBuilder {
	
	private DateUtil dateUtil;
	
	@Autowired
	public FullSummaryBuilder(DateUtil dateUtil) {
		this.dateUtil = dateUtil;
	}
}
