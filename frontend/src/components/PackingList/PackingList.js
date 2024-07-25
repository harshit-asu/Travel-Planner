import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getPackingLists } from '../../services/api';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import AddPackingList from './AddPackingList';
import {
  MDBCardBody,
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
} from 'mdb-react-ui-kit';
import CustomAlert from '../Misc/CustomAlert';

const PackingList = ({trip}) => {
  const [items, setItems] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: ""
  });

  const fetchPackingLists = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const response = await getPackingLists(trip.trip_id);
      if(response.status === 200){
        setItems(response.data.packing_lists);
      }
    } catch (error) {
      console.log(error);
    }
    setIsDataLoading(false);
  }, [trip.trip_id]);

  useEffect(() => {
    fetchPackingLists();
  }, [fetchPackingLists]);

  const closeAddItemModal = () => {
    setOpenAddItemModal(false);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <MDBContainer fluid>
      <CustomAlert alertData={alertData} setAlertData={setAlertData} />
      <MDBCard >
        <MDBCardHeader className="p-3">
          <MDBRow>
            <MDBCol md={8} className="d-flex flex-column justify-content-center">
              <h4 className="mb-0 ms-4 ps-2" style={{ color: '#04b4bd' }}>
                <strong>Packing List ({items.length})</strong>
              </h4>
            </MDBCol>
            <MDBCol md={4} className="d-flex justify-content-end pe-4">
              <MDBBtn className="mb-0 me-2 px-5 btn-custom " size="md" onClick={() => setOpenAddItemModal(true)}>Add Item</MDBBtn>
              <AddPackingList trip={trip} open={openAddItemModal} close={closeAddItemModal} fetchPackingLists={fetchPackingLists} setAlertData={setAlertData} />
            </MDBCol>
          </MDBRow>
        </MDBCardHeader>
        <MDBCardBody>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

PackingList.propTypes = {}

export default PackingList