export const validateField = (value, rules, fieldName) => {
    if (!rules) return '';

    const { required, minLength, maxLength, pattern } = rules;

    if (required && !value?.toString().trim()) {
        return `${fieldName} is required`;
    }

    if (minLength && value?.length < minLength) {
        return `${fieldName} must be at least ${minLength} characters`;
    }

    if (maxLength && value?.length > maxLength) {
        return `${fieldName} must be no more than ${maxLength} characters`;
    }

    if (pattern && value && !pattern.test(value)) {
        return `${fieldName} format is invalid`;
    }

    // TO DO: NEED TO EXTEND VALIDATION

    return '';
};

export const validateForm = (formData, columns, existingRecords, excludeId = null) => {
    const errors = {};

    for (const col of columns) {
        const error = validateField(formData[col.key], col.rules, col.title, formData, existingRecords, excludeId);
        if (error) errors[col.key] = error;
    }

    return {
        errors,
        hasErrors: !!Object.keys(errors).length
    };
};
