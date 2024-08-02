import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../../services/api';
import Box from '@mui/material/Box';
import AddExpense from './AddExpense';
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
import {
    randomId,
  } from '@mui/x-data-grid-generator';


const ExpenseList = ({ trip }) => {
  const [expenses, setExpenses] = useState([]);
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
      const response = await deleteExpense(id);
      var message_type = "error";
      if(response.status === 200){
        setExpenses(expenses.filter((row) => row.id !== id));
        message_type = "success";
      }
      setAlertData({
        showAlert: true,
        severity: message_type,
        message: response.data.message
      });
    };
  };

  const handleAddClick = () => {
    const id = randomId();
    setExpenses((oldRows) => [...oldRows, { id, category: '', amount: '', paid_by: '', expense_date: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = expenses.find((row) => row.id === id);
    if (editedRow.isNew) {
      setExpenses(expenses.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    if(newRow.isNew){
        const updatedRow = await handleAddNewExpense(newRow);
        return updatedRow;
    } else{
        const updatedRow = { ...newRow, isNew: false };
        if (window.confirm('Do you want to proceed?')) {
          const response = await updateExpense(newRow.id, newRow);
          var message_type = "error";
          if(response.status === 200){
            setExpenses(expenses.map((row) => (row.id === newRow.id ? updatedRow : row)));
            message_type = "success";
          }
          setAlertData({
            showAlert: true,
            severity: message_type,
            message: response.data.message
          });
        }
        return updatedRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const fetchExpenses = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const response = await getExpenses(trip.trip_id);
      if (response.status === 200) {
        setExpenses(response.data.expenses);
      }
    } catch (error) {
      console.log(error);
    }
    setIsDataLoading(false);
  }, [trip.trip_id]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleAddNewExpense = async (expenseData) => {
    setIsDataLoading(true);
    try {
      const response = await addExpense(trip.trip_id, expenseData);
      console.log(response);
      var message_type = "error";
      if(response.status === 201){
        fetchExpenses();
        message_type = "success";
        return {...expenseData, id: response.data.expense_id}
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

  const columns = [
    { 
      field: 'id', 
      headerName: 'ID', 
      flex: 0.1
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 0.2,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Destination', 'Activity', 'Accommodation', 'Transport'],
    },
    {
        field: 'amount',
        headerName: 'Amount',
        flex: 0.2,
        editable: true
    },
    {
      field: 'paid_by',
      headerName: 'Paid By',
      flex: 0.2,
    },
    {
        field: 'expense_date',
        headerName: 'Date',
        flex: 0.2,
        editable: true,
        type: 'date',
        valueGetter: (value) => value && new Date(value),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 0.2,
      editable: true,
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

        <MDBCol md={12}>
          <MDBCard >
            <MDBCardHeader>
              <MDBRow>
                <MDBCol md={8} className="d-flex flex-column justify-content-center">
                  <h4 className="mb-0 ps-2" style={{ color: '#04b4bd' }}>
                    <strong>Expenses</strong>
                  </h4>
                </MDBCol>
                <MDBCol md={4} className="d-flex justify-content-end pe-4">
                    <MDBBtn className="mb-0 me-2 px-5 btn-custom " size="md" onClick={handleAddClick}>Add Expense</MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardHeader>
            <MDBCardBody>
              <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                  rows={expenses}
                  columns={columns}
                  sx={{ width: '100%', minHeight: 400, paddingX: '10px' }}
                  editMode="row"
                  rowModesModel={rowModesModel}
                  onRowModesModelChange={handleRowModesModelChange}
                  onRowEditStop={handleRowEditStop}
                  processRowUpdate={processRowUpdate}
                  slotProps={{
                    toolbar: { setExpenses, setRowModesModel },
                  }}
                />
              </Box>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default ExpenseList