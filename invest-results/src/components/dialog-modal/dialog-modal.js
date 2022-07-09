import React, { useCallback, useMemo, useState } from 'react';

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

    const dateNow = useMemo(() => {
        const date = new Date();
        return date.getFullYear() + '-' + 
            String(date.getMonth() + 1).padStart(2, '0') + '-' + 
            String(date.getDate()).padStart(2, '0');
    }, [])

    const [ sum, setSum ] = useState("");
    const [ comment, setComment ] = useState("");
    const [ date, setDate ] = useState(dateNow + "T12:00:00.000Z");

    const onSumChange = useCallback((e) => {
        setSum(e.target.value);    
    }, []);

    const onCommentChange = useCallback((e) => {
    setComment(e.target.value);    
    }, []);

    const onDateChange = useCallback((e) => {
        setDate(e.target.value + "T12:00:00.000Z");           
        }, []);

    

    const onEnter = (e) => {
        if (e.key === "Enter") { funcToCloseOk({ sum, comment, date }) }
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
            onKeyPress={onEnter}
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
            onKeyPress={onEnter}
            
        />
        }
        <TextField
        id="date"
        label="Дата"
        type="date"
        defaultValue={dateNow}
        onChange={onDateChange}
        onKeyPress={onEnter}
        sx={{ mt: "1rem" }}
        InputLabelProps={{
          shrink: true,
        }}
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={funcToCloseCancel}>Отмена</Button>
        <Button onKeyPress={onEnter} 
                onClick={() => funcToCloseOk({ sum, comment, date })}>{dialogTitle}</Button>
        </DialogActions>
    </Dialog>
    )
}

export default DialogModal;
