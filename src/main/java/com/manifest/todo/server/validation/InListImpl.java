package com.manifest.todo.server.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.BeanUtils;

public class InListImpl implements ConstraintValidator<InList, Object> {

	private String fieldName;
	private String[] acceptedValues;
	
	@Override
	public void initialize(InList annotation) {
		fieldName          = annotation.fieldName();
        acceptedValues = annotation.acceptedValues();
	}

	@Override
	public boolean isValid(Object bean, ConstraintValidatorContext context) {
		try {
//			String fieldValue = 
		} catch(Exception e) {
			
		}
		return false;
	}

}
