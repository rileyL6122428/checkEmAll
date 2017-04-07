package com.manifest.todo.summary;

import static org.junit.Assert.*;

import java.util.Date;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

public class DateUtilTest {
	
	private DateUtil dateUtil;
	
	@Before
	public void setup() {
		dateUtil = new DateUtil();
	}

	@Test
	public void currentDate__returnsTheCurrentDate() {
		Date then = new Date();
		Date now = dateUtil.currentDate();
		assertTrue(then.before(now) || then.equals(now));
	}

}
