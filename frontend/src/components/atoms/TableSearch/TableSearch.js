import { useState, useEffect } from 'react';
import { renderInput } from '@/utils/inputRenderer';
import { useDebounce } from '@/hooks/useDebounce.hook';
import { Button } from '@/components/atoms/Button/Button';

const RESET_FILTER_TEXT = 'Reset Filter';
const SEARCH_DEBOUNCE_DELAY = 50;
const RESET_BUTTON_CONTAINER_CLASSNAME = 'absolute bottom-[-40px] flex justify-center right-0';

export const TableSearch = ({ searchColumn, onSearch, error: _error }) => {
    const [searchValues, setSearchValues] = useState({});
    const debouncedSearchValues = useDebounce(searchValues, SEARCH_DEBOUNCE_DELAY);

    const searchChange = (key, value) => {
        setSearchValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const resetFilter = () => {
        setSearchValues({});
        if (onSearch) onSearch({});
    };

    useEffect(() => {
        if (onSearch) {
            const hasSearchValue = Object.values(debouncedSearchValues).some(value => value && value.trim());

            let apiData = {};

            if (hasSearchValue) {
                const searchTerms = Object.values(debouncedSearchValues)
                    .filter(value => value && value.trim());
                const searchTerm = searchTerms.join(' ');
                apiData = { search: searchTerm };
            }

            onSearch(apiData);
        }
    }, [debouncedSearchValues]);

    const renderSearchInput = (col) => {
        const value = searchValues[col.key] || '';
        return renderInput(col, value, searchChange);
    };

    return (
        <tr>
            {searchColumn?.map((col, index) => (
                <td key={col.key || index}>{renderSearchInput(col)}</td>
            ))}
            <div className={RESET_BUTTON_CONTAINER_CLASSNAME}>
                <Button onClick={resetFilter} type="red">
                    {RESET_FILTER_TEXT}
                </Button>
            </div>
        </tr>
    );
};
