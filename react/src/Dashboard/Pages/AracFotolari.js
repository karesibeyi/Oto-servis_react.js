import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  }, paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginBottom:'2%',
    color: theme.palette.text.secondary,
},
}));

const tileData = [
     {
       img: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
       title: 'Image',
       author: 'author',
  },
    {
      img: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
      title: 'Image',
      author: 'author',
    },
    {
      img: 'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
      title: 'Image',
      author: 'author',

    },
  ];
/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...] 
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
<Grid item xs={12} style={{marginTop:'-3%', padding:'2px'}}>
<Paper className={classes.paper} style={{marginTop:'2%'}}>
             <Button style={{width:'100%'}}>Fotoğraf Yükle</Button>
             </Paper>

</Grid>
        
      <Grid container spacing={1}>
        {tileData.map((tile) => (
          <Grid item xs={2} >
            <img src={tile.img} alt={tile.title} />
            </Grid>
        ))}
      
      </Grid>
    </div>
  );
}