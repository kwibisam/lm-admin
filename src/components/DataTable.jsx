import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

const DataTable = ({columns,rows}) => {
  
  return (
    <DataGrid sx={{maxWidth: 1040}}
    rows={rows}
    columns={columns}
    initialState={{
      pagination: {
        paginationModel: { page: 0, pageSize: 5 },
      },
    }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
  />
  )
}

export default DataTable