// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

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
        { field: 'when', headerName: 'When', width: 150 },
        {
            field: 'success',
            headerName: 'Success',
            renderCell: (params) => {
                return (
                    <>{params.row.success ? '👍' : '👎'}</>
                )
            },
            width: 50,
        },
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
                    <button onClick={() => deleteHandler(params.row.index)}>
                        <DeleteIcon color="primary" />
                    </button>
                )
            },
        },
        {
            field: 'state',
            headerName: 'State',
            // renderCell: (params) => {
            //     return (
            //         <button onClick={() => runHandler(params.row.index)}>
            //             <DirectionsRunIcon color="primary" />
            //         </button>
            //     )
            // },
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
