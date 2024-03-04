import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export function DataTable({ rows, deleteHandler, editHandler, runHandler }) {

    const columns = [
        { field: 'name', headerName: 'Name',  width: 200},
        {
            field: 'edit',
            headerName: 'Edit',
            renderCell: (params) => {
                return (
                    <button onClick={() => editHandler(params.row.index)}>
                        <EditIcon color="primary"/>
                    </button>
                )
            },
        },
        {
            field: 'delete',
            headerName: 'Delete',
            renderCell: (params) => {
                return (
                    <button onClick={() => deleteHandler(params.row.index)}>
                        <DeleteIcon color="primary" />
                    </button>
                )
            },
        },
        {
            field: 'run',
            headerName: 'Run',
            renderCell: (params) => {
                return (
                    <button onClick={() => runHandler(params.row.index)}>
                        <DirectionsRunIcon color="primary" />
                    </button>
                )
            },
        },
    ];

    return (
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        // </div>
    );
}
