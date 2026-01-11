import { DateInput } from '@/components/atoms/DateInput/DateInput';
import { Dropdown } from '@/components/atoms/Dropdown/Dropdown';
import { TextInput } from '@/components/atoms/TextInput/TextInput';

export const renderInput = (column, value, onChange, error) => {
    if (column.type === 'dateinput') {
        return (
            <DateInput
                label={column.title}
                value={value}
                onChange={(e) => onChange(column.key, e.target.value)}
                error={error}
            />
        );
    }
    if (column.type === 'dropdown') {
        const options = column.options?.map((option) => ({ value: option, label: option })) || [];
        return (
            <Dropdown
                options={options}
                value={value}
                onChange={(selectedValue) => onChange(column.key, selectedValue)}
                error={error}
            />
        );
    }
    if (column.type === 'textinput') {
        return (
            <TextInput
                placeholder={column.title}
                value={value}
                onChange={(e) => onChange(column.key, e.target.value)}
                error={error}
            />
        );
    }
    return (
        <TextInput
            placeholder={column.title}
            value={value}
            onChange={(e) => onChange(column.key, e.target.value)}
            error={error}
        />
    );
};
