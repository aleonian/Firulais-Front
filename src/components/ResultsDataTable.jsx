// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';

export function ResultsDataTable({ rows, deleteHandler, viewResultHandler }) {
    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            renderCell: (params) => {
                return (
                    // <button onClick={() => deleteHandler(params.row.index)}>
                    //     <DeleteIcon color="primary" />
                    // </button>
                    <a href="#" onClick={() => viewResultHandler(params.row.index)}>{params.row.name}</a>
                )
            },
        },
        {
            field: 'success',
            headerName: 'Success',
            renderCell: (params) => {
                return (
                    <Box
                        sx={{
                            backgroundColor: params.row.success ? "green" : "red",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"

                        }}
                    >
                        <>{params.row.success ? '👍' : '👎'}</>
                    </Box>
                )
            },
            width: 50,
        },
        { field: 'when', headerName: 'When', width: 150 },

        { field: 'url', headerName: 'Url', width: 300 },
        // {
        //     field: 'edit',
        //     headerName: 'Edit',
        //     renderCell: (params) => {
        //         return (
        //             <button onClick={() => editHandler(params.row.index)}>
        //                 <EditIcon color="primary"/>
        //             </button>
        //         )
        //     },
        // },
        {
            field: 'delete',
            headerName: 'Delete',
            renderCell: (params) => {
                return (
                    <button onClick={() => deleteHandler(params.row.id)}>
                        <DeleteIcon color="primary" />
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
                    paginationModel: { page: 0, pageSize: 10 },
                },
            }}
            pageSizeOptions={[10, 50]}
            />
        // </div>
    );
}
