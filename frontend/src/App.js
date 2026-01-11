import { useEffect } from 'react';
import { Page } from '@/components/templates/Page/Page';
import { DataTable } from '@/components/organisms/TableWithPagination/TableWithPagination';
import { useApi } from '@/hooks/useApi.hook';
import { columns, addRow as addRowSchema, editRow as editRowSchema, searchColumn } from '@/data';

import '@/App.css';

function App() {
    const { data: recordsData, error, loading, fetchAPI, setPage } = useApi();

    // TO DO: add react route with pages
    // TO DO: fetches can be improve by cache system
    const refresh = () => {
        setPage(1);
        fetchAPI('/records');
    };

    const pageChange = (pageNum) => {
        setPage(pageNum);
        fetchAPI('/records', 'GET', null, { page: pageNum });
    };

    useEffect(() => {
        fetchAPI('/records');
    }, []);

    const addRow = async (formData, resetForm) => {
        await fetchAPI('/records', 'POST', formData);
        refresh();
        if (resetForm) resetForm();
    };

    const searchRecords = (apiData) => {
        setPage(1);
        fetchAPI('/records', 'GET', null, apiData);
    };

    const deleteRow = async (record) => {
        await fetchAPI(`/records/${record.id}`, 'DELETE');
        refresh();
    };

    const editRow = async (recordId, formData) => {
        await fetchAPI(`/records/${recordId}`, 'PUT', formData);
        refresh();
    };

    return (
        <Page>
            {/* TO DO: Statistics dashboard */}
            <DataTable
                title="Patients records"
                addMode
                editMode
                searchFilterMode
                columns={columns}
                addRow={addRowSchema}
                editRow={editRowSchema}
                searchColumn={searchColumn}
                data={recordsData}
                loading={loading}
                error={error}
                onAdd={addRow}
                onEdit={editRow}
                onSearch={searchRecords}
                onDelete={deleteRow}
                onPageChange={pageChange}
            />
        </Page>
    );
}

export default App;
