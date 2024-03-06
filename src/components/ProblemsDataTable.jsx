import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

export function ProblemsDatatAble({ rows }) {

    const columns = [
        {
            field: 'problemType', headerName: 'Problem Type', width: 200,
            renderCell: (params) => {
                return (
                    <><span className='problem-type'>{params.row.problemType}</span></>
                )
            }
        },
        { field: 'messageType', headerName: 'Msg Type', width: 200 },
        {
            field: 'errorMessage', headerName: 'Error Msg', width: 400,
            renderCell: (params) => {
                if (params.row.problemType === "BAD_ACTION_COMMAND") {
                    const firstPart = params.row.errorMessage.split(": ")[0];
                    const secondPart = params.row.errorMessage.split(": ")[1];
                    return (
                        <>{firstPart}:<span className='problem-type'>{secondPart}</span></>
                    )
                }

                return (
                    <>{params.row.errorMessage}</>
                )
            }
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
