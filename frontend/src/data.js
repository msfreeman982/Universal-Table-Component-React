import StatusBadge from '@/components/atoms/StatusBadge/StatusBadge'

// TO DO: move "columns" mb to page? 
const tableParams = {
    columns: {
        patientId: { key: 'patientId', title: 'Patient ID' },
        patientName: { key: 'patientName', title: 'Patient Name' },
        dateOfBirth: {
            key: 'dateOfBirth',
            title: 'Date of Birth',
        },
        diagnosis: { key: 'diagnosis', title: 'Diagnosis' },
        admissionDate: {
            key: 'admissionDate',
            title: 'Admission Date',
        },
        dischargeDate: {
            key: 'dischargeDate',
            title: 'Discharge Date',
        },
        status: {
            key: 'status',
            title: 'Status',
            render: (value) => <StatusBadge status={value}>{value}</StatusBadge>,
        },
        department: { key: 'department', title: 'Department' },
    },
    searchColumn: {
        patientId: {
            key: 'patientId',
            title: 'Patient ID',
            type: 'textinput',
        },
        patientName: {
            key: 'patientName',
            title: 'Patient Name',
            type: 'textinput',
        },
        dateOfBirth: {
            key: 'dateOfBirth',
            title: 'Date of Birth',
            type: 'dateinput',
        },
        diagnosis: {
            key: 'diagnosis',
            title: 'Diagnosis',
            type: 'textinput',
        },
        admissionDate: {
            key: 'admissionDate',
            title: 'Admission Date',
            type: 'dateinput',
        },
        dischargeDate: {
            key: 'dischargeDate',
            title: 'Discharge Date',
            type: 'dateinput',
        },
        status: {
            key: 'status',
            title: 'Status',
            type: 'dropdown',
            options: ['Active', 'Discharged', 'Pending', 'Cancelled'],
        },
        department: {
            key: 'department',
            title: 'Department',
            type: 'textinput',
        },
    },
    addRow: {
        patientId: {
            key: 'patientId',
            title: 'Patient ID',
            type: 'textinput',
            format: 'P#',
            rules: {
                required: true,
                pattern: /^P\d+$/,
                message: 'format P (example: P001)',
            },
        },
        patientName: {
            key: 'patientName',
            title: 'Patient Name',
            type: 'textinput',
            rules: {
                required: true,
                minLength: 2,
                maxLength: 24,
                message: 'Patient name 2 and 24 characters',
            },
        },
        dateOfBirth: {
            key: 'dateOfBirth',
            title: 'Date of Birth',
            type: 'dateinput',
            rules: {
                required: true,
                pattern: /^\d{4}-\d{2}-\d{2}$/,
                message: 'Date format must be YYYY-MM-DD',
            },
        },
        diagnosis: {
            key: 'diagnosis',
            title: 'Diagnosis',
            type: 'textinput',
            rules: {
                required: true,
                minLength: 3,
                maxLength: 24,
                message: 'between 3 and 24 characters',
            },
        },
        admissionDate: {
            key: 'admissionDate',
            title: 'Admission Date',
            type: 'dateinput',
            rules: {
                required: true,
                pattern: /^\d{4}-\d{2}-\d{2}$/,
                message: 'Date format must be YYYY-MM-DD',
            },
        },
        dischargeDate: {
            key: 'dischargeDate',
            title: 'Discharge Date',
            type: 'dateinput',
            optional: true,
            rules: {
                pattern: /^\d{4}-\d{2}-\d{2}$/,
                message: 'Date format must be YYYY-MM-DD',
            },
        },
        status: {
            key: 'status',
            title: 'Status',
            type: 'dropdown',
            options: ['Active', 'Discharged', 'Pending', 'Cancelled'],
            rules: {
                required: true,
                message: 'Status required',
            },
        },
        department: {
            key: 'department',
            title: 'Department',
            type: 'textinput',
            rules: {
                required: true,
                minLength: 2,
                maxLength: 24,
                message: 'between 2 and 24 characters',
            },
        },
    },
};

export const columns = Object.values(tableParams.columns);
export const addRow = tableParams.addRow;
export const editRow = tableParams.addRow;
export const searchColumn = Object.values(tableParams.searchColumn);
