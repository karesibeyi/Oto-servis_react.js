import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

//İcons
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DashboardIcon from '@material-ui/icons/Dashboard';
import StorageIcon from '@material-ui/icons/Storage';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PersonIcon from '@material-ui/icons/Person';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';


//Pages
import StokKarti from './Pages/StokKarti';
import Fatura from './Pages/Fatura';
import KasaKarti from './Pages/KasaKarti';
import Personel from './Pages/Personel';
import Cari from './Pages/Cari';
import ServistekiArac from './Pages/ServistekiArac';
import RandevuTalebi from './Pages/RandevuTalebi';
import AracKayit from './Pages/AracKayit';
import SatisİsEmri from './Pages/SatisİsEmri';
import Anasayfa from './Pages/Anasayfa';

import app from '../Login/Extra/base';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    marginLeft: -19
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState('Default Title');
  const [page, setPage] = React.useState('Anasayfa');
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const RoutePage = () => {

    if (page == 'Anasayfa') {
      return (<Anasayfa setTitle={setPageTitle} setPage={setPage} />)
    }
    else if (page == 'Stok') {
      return (<StokKarti setTitle={setPageTitle} />)
    }

    else if (page == 'Fatura') {
      return (<Fatura setTitle={setPageTitle} />)
    }
    else if (page == 'Kasa') {
      return (<KasaKarti setTitle={setPageTitle} />)
    }
    
    else if (page == 'Servisteki Arac Listesi') {
      return (<ServistekiArac setTitle={setPageTitle} />)
    }
    else if (page == 'Satış & İş Emri') {
      return (<SatisİsEmri setTitle={setPageTitle} />)
    }
    else if (page == 'Araç Giriş') {
      return (<AracKayit setTitle={setPageTitle} />)
    }
    else if (page == 'Randevu Talebi') {
      return (<RandevuTalebi setTitle={setPageTitle} />)
    }
    else if (page == 'Personel') {
      return (<Personel setTitle={setPageTitle} />)
    }
    else if (page == 'Cari') {
      return (<Cari setTitle={setPageTitle} />)
    }
  }
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="end"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >

            <Tooltip title={'Menü Listesi'}><MenuIcon /></Tooltip>
          </IconButton >
          <Typography variant="h6" noWrap style={{ margin: 'auto',}}>
            {
              pageTitle
            }
          </Typography>
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => app.auth().signOut()}
            edge="end"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Tooltip title={'Çıkış Yap'}><ExitToAppIcon /></Tooltip>
          </IconButton >
         
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} alighn="left">
          <IconButton onClick={handleDrawerClose}>
            <Typography alighn="left">
              <MenuBookIcon /> &nbsp; MENU LİSTESİ &nbsp;
              </Typography>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <Divider />
        {/* Edit */}
        <List>
          {['Anasayfa','Araç Giriş','Satış & İş Emri','Servisteki Arac Listesi', 'Stok', 'Fatura', 'Randevu Talebi', 'Kasa','Cari','Personel'].map((text, index) => (
            <ListItem button key={text} onClick={() => setPage(text)} style={{backgroundColor: page === text ? 'lightGray' : 'white'}}>
              <ListItemIcon >
                {index == 0 ? <Tooltip title={text} id={index} ><DashboardIcon /></Tooltip> : null}
                {index == 1 ? <Tooltip title={text} id={index}><DriveEtaIcon /></Tooltip> : null}
                {index == 2 ? <Tooltip title={text} id={index}><StorageIcon /></Tooltip> : null}
                {index == 3 ? <Tooltip title={text} id={index}><NotListedLocationIcon /></Tooltip> : null}
                {index == 4 ? <Tooltip title={text} id={index}><BusinessCenterIcon /></Tooltip> : null}
                {index == 5 ? <Tooltip title={text} id={index}><DescriptionIcon /></Tooltip> : null}
                {index == 6 ? <Tooltip title={text} id={index}><BorderColorIcon /></Tooltip> : null}
                {index == 7 ? <Tooltip title={text} id={index}><AccountBalanceIcon /></Tooltip> : null}
                {index == 8 ? <Tooltip title={text} id={index}><ContactsIcon /></Tooltip> : null}
                {index == 9 ? <Tooltip title={text} id={index}><PersonIcon /></Tooltip> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {/* Edit End*/}
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          RoutePage()
        }
      </main>
    </div>
  );
}