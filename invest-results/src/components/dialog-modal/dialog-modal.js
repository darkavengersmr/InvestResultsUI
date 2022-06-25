import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const DialogModal = ({ triggerToOpen, 
                       funcToCloseOk, 
                       funcToCloseCancel, 
                       dialogTitle, 
                       dialogContentText,
                       commentNeed                       
                    }) => {

    const [ sum, setSum ] = useState("");
    const [ comment, setComment ] = useState("");

    const onSumChange = (e) => {
        setSum(e.target.value);    
      }

    const onCommentChange = (e) => {
    setComment(e.target.value);    
    }

    return (
    <Dialog open={triggerToOpen} 
            onClose={funcToCloseCancel}
            >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            {dialogContentText}
        </DialogContentText>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Сумма"
            type="number"
            fullWidth
            variant="standard"
            onChange={onSumChange}
        />
        { commentNeed && 
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Комментарий"
            type="text"
            fullWidth
            variant="standard"
            onChange={onCommentChange}
        />
        }
        </DialogContent>
        <DialogActions>
        <Button onClick={funcToCloseCancel}>Отмена</Button>
        <Button onClick={() => funcToCloseOk(sum, comment)}>{dialogTitle}</Button>
        </DialogActions>
    </Dialog>
    )
}

export default DialogModal;
