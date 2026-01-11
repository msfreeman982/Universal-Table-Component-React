import { useState } from 'react';
import { Pagination } from '@/components/molecules/Pagination/Pagination';
import { TableHeader } from '@/components/atoms/TableHeader/TableHeader';
// import { TableFooter } from '@/components/atoms/TableFooter.js/TableFooter';
import { TableRows } from '@/components/atoms/TableRows/TableRows';
import { TableAdd } from '@/components/molecules/TableAdd/TableAdd';
import { TableSearch } from '@/components/atoms/TableSearch/TableSearch';
import { TableContainer } from '@/components/molecules/TableContainer/TableContainer';
import { Informer } from '@/components/atoms/Informer/Informer';
import { Title } from '@/components/atoms/Title/Title';
import { Modal } from '@/components/atoms/Modal/Modal';
import { Button } from '@/components/atoms/Button/Button';
import { Paragraph } from '@/components/atoms/Paragraph/Paragraph';
import { validateForm } from '@/utils/validation';
import { useMessageState } from '@/hooks/useMessageState.hook';
import {
    TABLE_STYLES,
    EDIT_BUTTONS_CONTAINER_STYLES,
    SUCCESS_MESSAGE,
    EDIT_SUCSS_MESSAGE,
    DELETE_SUCCESS_MESSAGE,
    NO_RESULTS_MESSAGE,
    ADD_BUTTON_TEXT,
    CANCEL_ADD_BUTTON_TEXT,
    SAVE_EDIT_BUTTON_TEXT,
    SEARCH_BUTTON_TEXT,
    CANSEL_SEARCH_BUTTON_TEXT,
    DELETE_TITLE,
    DELETE_MESSAGE,
    DELETE_CONFIRM_BUTTON,
} from './data';

// TO DO: Sort records by different fields
export const DataTable = ({
    addRow,
    editRow,
    searchColumn,
    // total,
    loading,
    data,
    title,
    pagination = true,
    columns,
    addMode = false,
    editMode = false,
    searchFilterMode = false,
    onAdd,
    onEdit,
    onSearch,
    onDelete,
    onPageChange,
    error,
}) => {
    const recordsData = Array.isArray(data?.data) ? data.data : [];
    const paginationData = data?.pagination || {};

    const getFormFieldDefinitions = (obj) => {
        if (!obj || typeof obj !== 'object') return [];
        return Object.values(obj);
    };

    const [searchMode, setSearchMode] = useState(false);
    const [isAddMode, setIsAddMode] = useState(false);
    const [editingRowId, setEditingRowId] = useState(null);
    const [editData, setEditData] = useState({});
    const [editErrors, setEditErrors] = useState({});
    const [successMsg, setSuccessMsg] = useMessageState();
    const [errorMsg, setErrorMsg] = useMessageState();

    const [modalState, setModalState] = useState({ isOpen: false, row: null });

    const displayUserMessage = (type, msg) => {
        if (type === 'success') {
            setSuccessMsg(msg);
            setErrorMsg('');
        } else if (type === 'error') {
            setSuccessMsg('');
            setErrorMsg(msg);
        }
    };

    const addRowCopmlete = async (formData, resetFormData) => {
        if (onAdd) {
            await onAdd(formData, resetFormData);
            setIsAddMode(false);
            displayUserMessage('success', SUCCESS_MESSAGE);
        }
    };

    const deleteButtonClick = (row) => {
        setModalState({ isOpen: true, row });
    };

    const deleteCancel = () => {
        setModalState({ isOpen: false, row: null });
    };

    const deleteConfirmation = () => {
        if (modalState.row && onDelete) {
            onDelete(modalState.row);
            displayUserMessage('success', DELETE_SUCCESS_MESSAGE);
            deleteCancel();
        }
    };

    const resetAddAndSearchModes = () => {
        setIsAddMode(false);
        setSearchMode(false);
    };

    const resetEditFormState = () => {
        setEditingRowId(null);
        setEditData({});
        setEditErrors({});
    };

    const editButtonClick = (row) => {
        setEditingRowId(row.id);
        setEditData({ ...row });
        resetAddAndSearchModes();
    };

    const handleEditCancel = resetEditFormState;

    const editSave = async () => {
        if (onEdit && editingRowId) {
            const validation = validateForm(editData, getFormFieldDefinitions(editRow), recordsData || [], editingRowId);
            if (validation.hasErrors) {
                setEditErrors(validation.errors);
                return;
            }

            try {
                await onEdit(editingRowId, editData);
                resetEditFormState();
                displayUserMessage('success', EDIT_SUCSS_MESSAGE);
            } catch (error) {
                displayUserMessage('error', error.message || 'Failed to save changes');
            }
        }
    };

    const editFieldChange = (key, value) => {
        setEditData(prev => ({ ...prev, [key]: value }));
        setEditErrors(prev => ({ ...prev, [key]: '' }));
    };

    const searchSubmit = (searchParams) => {
        if (!onSearch) return;
        onSearch(Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v)));
    };

    return (
        <>
            <div className="flex flex-row justify-between">
                {title && <Title>{title}</Title>}
                <div className="flex gap-2 my-2">
                    {addMode && (
                        <Button
                            onClick={() => {
                                setIsAddMode(prev => !prev);
                                setSearchMode(false);
                            }}
                            type={isAddMode ? 'gray' : 'blue'}
                        >
                            {isAddMode ? CANCEL_ADD_BUTTON_TEXT : ADD_BUTTON_TEXT}
                        </Button>
                    )}
                    {searchFilterMode && (
                        <Button
                            onClick={() => {
                                setSearchMode(prev => !prev);
                                setIsAddMode(false);
                            }}
                            type={searchMode ? 'gray' : 'blue'}
                        >
                            {searchMode ? CANSEL_SEARCH_BUTTON_TEXT : SEARCH_BUTTON_TEXT}
                        </Button>
                    )}
                </div>
            </div>

            {successMsg && <Informer text={successMsg} />}
            {errorMsg && <Informer textError={errorMsg} />}
            {error && <Informer textError={error} />}

            <TableContainer loading={loading}>
                <table className={TABLE_STYLES}>
                    {columns && <TableHeader columns={columns} showEditColumn={editMode} showDeleteColumn={!!onDelete} />}
                    <tbody>
                        {searchMode && <TableSearch searchColumn={searchColumn} onSearch={searchSubmit} error={error} />}
                        {isAddMode && <TableAdd addRow={getFormFieldDefinitions(addRow)} onAdd={addRowCopmlete} existingRecords={recordsData || []} />}
                        {!loading && (
                            <TableRows
                                data={recordsData}
                                columns={columns}
                                editMode={editMode}
                                editingRow={editingRowId}
                                editFormData={editData}
                                editRow={getFormFieldDefinitions(editRow)}
                                onDelete={deleteButtonClick}
                                onEdit={editButtonClick}
                                onEditFormChange={editFieldChange}
                                editErrors={editErrors}
                            />
                        )}
                    </tbody>
                    {!isAddMode && !loading && searchMode && recordsData?.length === 0 && (
                        <div className="py-8 flex justify-center text-gray-500">{NO_RESULTS_MESSAGE}</div>
                    )}
                    {/* {total && <TableFooter total={total} />} */}
                    {editingRowId && (
                        <div className={EDIT_BUTTONS_CONTAINER_STYLES}>
                            <Button onClick={handleEditCancel} type="gray">Cancel</Button>
                            <Button onClick={editSave} type="green">{SAVE_EDIT_BUTTON_TEXT}</Button>
                        </div>
                    )}
                </table>
            </TableContainer>

            {pagination && (
                <div className="flex flex-row justify-start">
                    <Pagination pagination={paginationData} setPage={onPageChange} />
                </div>
            )}

            <Modal isOpen={modalState.isOpen} onClose={deleteCancel} title={DELETE_TITLE}>
                <Paragraph className="mb-4">{DELETE_MESSAGE}</Paragraph>
                <div className="flex justify-end">
                    <Button onClick={deleteConfirmation} type="red">{DELETE_CONFIRM_BUTTON}</Button>
                </div>
            </Modal>
        </>
    );
};
