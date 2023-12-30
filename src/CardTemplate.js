import * as React from 'react';
import 'tachyons';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Typography from '@mui/material/Typography';

export function CardAdd () {
  return (
    <div className="tc grow br6 pa3 dib bw2" style={{ margin: '15px' }}>
        <Card sx={{ maxWidth: 295, width: 300, height: 130, backgroundColor: '#7B7979' }}>
          <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton aria-label="view">
              <AddIcon style={{ fontSize: 50, color: 'black' }} />
            </IconButton>
          </CardActions>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-30px' }}>
            <Typography gutterBottom variant="h5" component="div">
              ADD
            </Typography>
          </CardContent>
        </Card>
      </div>
  );
}

export function CardEdit () {
    return (
        <div className="tc grow br6 pa3 dib bw2" style={{ margin: '15px' }}>
        <Card sx={{ maxWidth: 295, width: 300, height: 130, backgroundColor: '#7B7979' }}>
          <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton aria-label="view">
              <ModeEditOutlineOutlinedIcon style={{ fontSize: 50, color: 'black' }} />
            </IconButton>
          </CardActions>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-30px' }}>
            <Typography gutterBottom variant="h5" component="div">
              EDIT
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  export function CardDelete() {
    return (
        <div className="tc grow br6 pa3 dib bw2" style={{ margin: '15px' }}>
        <Card sx={{ maxWidth: 295, width: 300, height: 130, backgroundColor: '#7B7979' }}>
          <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton aria-label="view">
              <DeleteForeverIcon style={{ fontSize: 50, color: 'black' }} />
            </IconButton>
          </CardActions>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-30px' }}>
            <Typography gutterBottom variant="h5" component="div">
              DELETE
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  export function CardView() {
    return (
      <div className="tc grow br6 pa3 dib bw2" style={{ margin: '15px' }}>
        <Card sx={{ maxWidth: 295, width: 300, height: 130, backgroundColor: '#7B7979' }}>
          <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton aria-label="view">
              <VisibilityOutlinedIcon style={{ fontSize: 50, color: 'black' }} />
            </IconButton>
          </CardActions>
          <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-30px' }}>
            <Typography gutterBottom variant="h5" component="div">
              VIEW
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
