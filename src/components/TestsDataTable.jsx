import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { Box } from '@mui/material';

export function TestsDataTable({ rows, deleteHandler, editHandler, runHandler }) {

    const columns = [
        { field: 'name', headerName: 'Name', width: 400 },
        {
            field: 'edit',
            headerName: 'Edit',
            renderCell: (params) => {
                return (
                    <button onClick={() => editHandler(params.row.index)}>
                        <EditIcon color="primary" />
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
        {
            field: 'state',
            headerName: 'State',
            renderCell: (params) => {
                
                return (
                    <Box sx={{ fontSize: '30px' }}>
                        {params.row.state ? '⏱' : '💤'}
                    </Box>
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
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 50]}
        />
        // </div>
    );
}
