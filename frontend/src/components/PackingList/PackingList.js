import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { addPackingList, deletePackingList, getPackingLists, updatePackingList } from '../../services/api';
import Box from '@mui/material/Box';
import AddPackingList from './AddPackingList';
import Loading from '../Misc/Loading';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import CustomAlert from '../Misc/CustomAlert';

const PackingList = ({ trip }) => {
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({
    'item_name': '',
    'quantity': 1
  });
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [alertData, setAlertData] = useState({
    showAlert: false,
    severity: "",
    message: ""
  });

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    if (window.confirm('Do you want to proceed with the deletion?')){
      const response = await deletePackingList(id);
      var message_type = "error";
      if(response.status === 200){
        setItems(items.filter((row) => row.id !== id));
        message_type = "success";
      }
      setAlertData({
        showAlert: true,
        severity: message_type,
        message: response.data.message
      });
    };
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = items.find((row) => row.id === id);
    if (editedRow.isNew) {
      setItems(items.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    if (window.confirm('Do you want to proceed?')) {
      const response = await updatePackingList(newRow.id, newRow);
      var message_type = "error";
      if(response.status === 200){
        setItems(items.map((row) => (row.id === newRow.id ? updatedRow : row)));
        message_type = "success";
      }
      setAlertData({
        showAlert: true,
        severity: message_type,
        message: response.data.message
      });
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const fetchPackingLists = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const response = await getPackingLists(trip.trip_id);
      if (response.status === 200) {
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

  const handleAddNewItem = async (e) => {
    e.preventDefault();
    setIsDataLoading(true);
    try {
      const response = await addPackingList(trip.trip_id, itemData);
      console.log(response);
      var message_type = "error";
      if(response.status === 201){
        fetchPackingLists();
        message_type = "success";
        setItemData({
          'item_name': '',
          'quantity': 1
        });
      }
      setAlertData({
        showAlert: true,
        severity: message_type,
        message: response.data.message
      });
    } catch (error) {
      setAlertData({
        showAlert: true,
        severity: "error",
        message: String(error)
      });
    }
    setIsDataLoading(false);
  };

  const handleIncrement = () => {
    setItemData({
      item_name: itemData.item_name,
      quantity: itemData.quantity + 1
    });
  }

  const handleDecrement = () => {
    if (itemData.quantity === 1) {
      return;
    }
    setItemData({
      item_name: itemData.item_name,
      quantity: itemData.quantity - 1
    });
  }

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      flex: 0.1
    },
    {
      field: 'item_name',
      headerName: 'Item',
      flex: 0.3,
      editable: true
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 0.2,
      editable: true
    },
    {
      field: 'packed',
      headerName: 'Status',
      flex: 0.2,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Packed', 'Not packed'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 0.2,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon style={{color: '#04b4bd'}} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon style={{color: 'red'}} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  if(isDataLoading){
    return <Loading />
  }


  return (
    <MDBContainer fluid>
      <CustomAlert alertData={alertData} setAlertData={setAlertData} />
      <MDBRow>

        <MDBCol md={8}>
          <MDBCard >
            <MDBCardHeader>
              <MDBRow>
                <MDBCol md={8} className="d-flex flex-column justify-content-center">
                  <h4 className="mb-0 ps-2" style={{ color: '#04b4bd' }}>
                    <strong>Packing List ({items.length})</strong>
                  </h4>
                </MDBCol>
              </MDBRow>
            </MDBCardHeader>
            <MDBCardBody>
              <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                  rows={items}
                  columns={columns}
                  sx={{ width: '100%', minHeight: 400, paddingX: '10px' }}
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  slotProps={{
                    toolbar: { setItems, setRowModesModel },
                  }}
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
                <MDBCol md={10}>
                  <MDBInput label="Item name" id="item_name" type="text" size='lg' value={itemData.item_name} onChange={(e) => setItemData({ item_name: e.target.value, quantity: itemData.quantity })} required />
                </MDBCol>
                <MDBRow>
                  <MDBCol md={6}>
                    <MDBInputGroup>
                      <MDBBtn type='button' className='btn btn-custom d-flex justify-content-center align-items-center' onClick={handleDecrement}><i className="fa-solid fa-minus"></i></MDBBtn>
                      <MDBInput label="" id="quantity" type="text" size='md' value={itemData.quantity} onChange={(e) => setItemData({ item_name: itemData.item_name, quantity: e.target.value })} required className='text-center' />
                      <MDBBtn type='button' className='btn btn-custom d-flex justify-content-center align-items-center' onClick={handleIncrement} ><i className="fa-solid fa-plus"></i></MDBBtn>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={4}>
                    <MDBBtn className='btn btn-custom h-100 w-100' type='submit' size='md'>Add</MDBBtn>
                  </MDBCol>
                </MDBRow>
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