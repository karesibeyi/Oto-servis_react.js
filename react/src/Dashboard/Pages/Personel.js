import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { API_URL } from '../constants';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import { DataGrid } from '@material-ui/data-grid';
import PersonelKayitModal from '../Modals/PersonelKayitModal';
import WrongModal from '../Modals/WrongModal';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const columns = [
  { field: 'Ad', headerName: "Personel Ad", width: 200 },
  { field: 'Gsm', headerName: "Personel Gsm", width: 200 },
  { field: 'TC', headerName: "Personel TC", width: 200 },
  { field: 'Adres', headerName: "Personel Adres", width: 300 },

];



export default function Personel(props) {
  const classes = useStyles();
  props.setTitle('Personel');
//
  const [editButtonDisabled, setEditButtonDisabled ] = useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled ] = useState(true);
  const [selectedRowIDs, setSelectedRowIDs ] = useState([]);
  const [personelData, setPersonelData] = useState(null)

  const [open, setOpen] = React.useState(false);
  const [wrongModalOpen, setWrongModalOpen] = React.useState(false);
  const [personelRow, setPersonelRow] = useState([]);
  

  const handleRowEdit = () => {
    personelRow.map((data, index) => {
        if(data.id == selectedRowIDs[0]) {
          setPersonelData({id: data.id, ad: data.Ad, gsm: data.Gsm, tc: data.TC, adres: data.Adres})
        }
    })
    setOpen(true)
  }

  const handleRowDelete = () => {
    if(!wrongModalOpen) {
      setWrongModalOpen(true)
    }else{
      axios.post(API_URL + '/arac/personelSil', {ids: selectedRowIDs}).then((resp) => {
        if(resp.data.status == 'success') {
          setWrongModalOpen(false);
          GetAllPersonel();
        }
        else{
          console.log('Axios Personel Post Error!');
        }
      }).catch((error) => {
        console.log('Axios Error: ', error)
      })
    }
  }
  ////

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Tooltip title="Düzenle">
          <IconButton disabled={editButtonDisabled}>
            <EditIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }}  onClick={() => handleRowEdit()}  />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sil" style={{ padding: 10 }}>
          <IconButton disabled={deleteButtonDisabled}>
            <DeleteIcon style={{ width: '20px', height: '20px', margin: 5, cursor: 'pointer' }} onClick={() => handleRowDelete()}  />
          </IconButton>
        </Tooltip>
      </GridToolbarContainer>
    );
  }
  

  useEffect(() => {
    GetAllPersonel()
  }, [])

  const GetAllPersonel = () => {
    axios.get(API_URL + '/arac/personel').then((resp) => {
      let tempArrayRow = [];

      resp.data.data.map((rows, index) => {
        tempArrayRow[index] = { id: rows.ID, Ad: rows.Ad, Gsm: rows.Gsm, TC: rows.TC, Adres: rows.Adres };
      })

      setPersonelRow(tempArrayRow);

    }).catch((err) => {
      console.log("Axios GET Error --> ", err)
    })
  }
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={11} > </Grid>
        <Grid item  >
          <PersonelKayitModal open={open} setOpen={setOpen} personelData={personelData} refreshData={() => GetAllPersonel()}/>
          <WrongModal 
              wrongModalOpen={wrongModalOpen}   
              setWrongModalOpen={setWrongModalOpen} 
              title={'Personel Sil'} 
              content={'Personeli silmek istediğinize emin misiniz?'} 
              onClick={() => handleRowDelete()} 
          />
          <Tooltip title=" Personel Kaydı Oluştur " placement="left" >
            <Fab color="primary" className={classes.absolute} onClick={() => {setPersonelData(null); setOpen(true)}} >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>

      <Grid item xs="12" className={classes.grid}>
        <div style={{ height: 410, width: '100%', marginTop: '1%' }}>
          <DataGrid rows={personelRow} columns={columns} checkboxSelection
            rowHeight={30}
            localeText={{
              columnMenuSortAsc: 'Alfabetik Sırala',
              columnMenuSortDesc: 'Tersten Sırala',
              columnMenuFilter: 'Filtrele',
              columnMenuUnsort: 'Filtrelemeyi Temizle',
              columnMenuHideColumn: 'Sütunu Gizle',
              columnMenuShowColumns: 'Tümünü Göster',
              filterPanelColumns: 'Başlıklar',
              filterPanelOperators: 'İşlemler',
              filterPanelInputLabel: 'Sözcük Arama',
              filterPanelInputPlaceholder: 'Aranacak Sözcük...',
              filterOperatorEquals: 'Eşleştir',
              filterOperatorContains: 'İçerikte Ara',
              filterOperatorStartsWith: 'Baştan Ara',
              filterOperatorEndsWith: 'Sondan Ara',
            }}
            components={{
              Toolbar: CustomToolbar,
            }}
            onSelectionModelChange={(newSelection) => {
              if(newSelection.selectionModel.length != 0) {
                setDeleteButtonDisabled(false);
                if(newSelection.selectionModel.length > 1 ) {
                  setEditButtonDisabled(true)
                }
                else{
                  setEditButtonDisabled(false)
                }
              }
              else{
                setDeleteButtonDisabled(true);
                setEditButtonDisabled(true)
              }
              setSelectedRowIDs(newSelection.selectionModel)
            }}

            />
        </div>
      </Grid>
    </div>
  )
}
