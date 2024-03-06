import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export function ProblemsDatatAble({ rows }) {

    const columns = [
        { field: 'problemType', headerName: 'Problem Type',  width: 200},
        { field: 'messageType', headerName: 'Msg Type',  width: 200},
        { field: 'errorMessage', headerName: 'Error Msg', width: 400 },
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
