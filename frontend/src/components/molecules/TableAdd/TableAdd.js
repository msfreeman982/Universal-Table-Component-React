import { useState, useCallback } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { renderInput } from '@/utils/inputRenderer';
import { validateForm } from '@/utils/validation';

const ADD_RECORD_TEXT = 'Add record';
const BUTTON_STYLES = 'absolute bottom-[-40px] flex justify-center right-0';

export const TableAdd = ({ addRow, onAdd, existingRecords }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    const inputChange = (key, value) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));

        if (errors[key]) {
            setErrors((prev) => ({
                ...prev,
                [key]: '',
            }));
        }
    };

    const resetFormData = useCallback(() => {
        setFormData({});
        setErrors({});
    }, []);

    const add = () => {
        const validation = validateForm(formData, addRow, existingRecords);
        if (validation.hasErrors) {
            setErrors(validation.errors);
            return;
        }

        if (onAdd) onAdd(formData, resetFormData);
    };

    return (
        <>
            <tr>
                {addRow?.map((col, index) => (
                    <td key={col.key || index}>
                        {renderInput(col, formData[col.key] || '', inputChange, errors[col.key])}
                    </td>
                ))}
            </tr>
            <div className={BUTTON_STYLES}>
                <Button onClick={add}>{ADD_RECORD_TEXT}</Button>
            </div>
        </>
    );
};
