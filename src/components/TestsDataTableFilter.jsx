import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const VISIBLE_FIELDS = ['name', 'edit', 'delete', 'run', 'state'];

export function TestsDataTableFilter({ rows, deleteHandler, editHandler, runHandler }) {

    // const { data } = useDemoData({
    //     dataSet: 'Employee',
    //     visibleFields: VISIBLE_FIELDS,
    //     rowLength: 100,
    // });
    // Otherwise filter will be applied on fields such as the hidden column id

    const myColumns = [
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

    const data = {};
    data.rows = rows;
    data.columns = myColumns;
    console.log(data);

    const columns = React.useMemo(
        () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [data.columns],
    );


    return (
        <Box sx={{ height: 600}}>
            <DataGrid
                rows={rows}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                    },
                }}
            />
        </Box>
    );
}