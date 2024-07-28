import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { addPackingList, getPackingLists } from '../../services/api';
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
  MDBInput,
  MDBInputGroup,
  MDBIcon
} from 'mdb-react-ui-kit';
import CustomAlert from '../Misc/CustomAlert';

const PackingList = ({trip}) => {
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({
    'item_name': '',
    'quantity': 1
  });
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

  const handleAddNewItem = async () => {
    try {
      const response = await addPackingList(trip.trip_id, itemData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = () => {
    setItemData({
      item_name: itemData.item_name,
      quantity: itemData.quantity + 1
    });
  }

  const handleDecrement = () => {
    if(itemData.quantity === 1){
      return;
    }
    setItemData({
      item_name: itemData.item_name,
      quantity: itemData.quantity - 1
    });
  }

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.2 },
    {
      field: 'item_name',
      headerName: 'Item',
      flex: 0.4,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 0.2,
      editable: false,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 0.2,
      editable: false,
    }
  ];


  return (
    <MDBContainer fluid>
      <CustomAlert alertData={alertData} setAlertData={setAlertData} />
      <MDBRow>

      <MDBCol md={8}>
      <MDBCard >
        <MDBCardHeader>
          <MDBRow>
            <MDBCol md={12} className="d-flex flex-column justify-content-center">
              <h4 className="mb-0 ps-2" style={{ color: '#04b4bd' }}>
                <strong>Packing List ({items.length})</strong>
              </h4>
            </MDBCol>
            {/* <MDBCol md={4} className="d-flex justify-content-end">
              <MDBBtn className="mb-0 me-2 px-5 btn-custom " size="md" onClick={() => setOpenAddItemModal(true)}>Add Item</MDBBtn>
              <AddPackingList trip={trip} open={openAddItemModal} close={closeAddItemModal} fetchPackingLists={fetchPackingLists} setAlertData={setAlertData} />
            </MDBCol> */}
          </MDBRow>
        </MDBCardHeader>
        <MDBCardBody>
          <Box sx={{ height: '100%', width: '100%'}}>
            <DataGrid
              rows={items}
              columns={columns}
              sx={{ width: '100%', minHeight: 400 }}
              checkboxSelection
            />
          </Box>
        </MDBCardBody>
      </MDBCard>
      </MDBCol>
      <MDBCol md={4} className='d-flex flex-column gap-3'>
                <MDBCard>
                    <MDBCardHeader>
                        <h4 className="mb-0 ps-2" style={{ color: "#04b4bd" }}>
                            {/* <MDBIcon fas icon="chevron-right" className="me-2" /> */}
                            <strong>Add new item</strong>
                        </h4>
                    </MDBCardHeader>
                    <form onSubmit={handleAddNewItem}>
                        <MDBCardBody className='d-flex flex-column gap-3 align-items-start'>
                            <MDBRow>
                              <MDBCol md={7}>
                                <MDBInput label="Item name" id="item_name" type="text" size='lg' value={itemData.item_name} onChange={(e) => setItemData({item_name: e.target.value, quantity: itemData.quantity})} required />
                              </MDBCol>
                              <MDBCol md={5}>
                                <MDBInputGroup>
                                <MDBBtn type='button' className='btn btn-custom d-flex justify-content-center align-items-center' onClick={handleDecrement}><i className="fa-solid fa-minus"></i></MDBBtn>
                                  <MDBInput label="" id="quantity" type="text" size='lg' value={itemData.quantity} onChange={(e) => setItemData({item_name: itemData.item_name, quantity: e.target.value})} required className='text-center' />
                                  <MDBBtn type='button' className='btn btn-custom d-flex justify-content-center align-items-center' onClick={handleIncrement} ><i className="fa-solid fa-plus"></i></MDBBtn>
                                </MDBInputGroup>
                              </MDBCol>
                            </MDBRow>
                            <MDBCol md={4}>
                            <MDBBtn className='btn btn-custom h-100' type='submit' size='md'>Add</MDBBtn>
                            </MDBCol>
                        </MDBCardBody>
                    </form>
                </MDBCard>
            </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

PackingList.propTypes = {}

export default PackingList