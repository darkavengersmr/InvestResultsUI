import React, { useMemo } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useInput } from '../../hooks';

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

    const sum = useInput('')
    const comment = useInput('')
    const date = useInput(dateNow)

    const funcToCloseOkArgs = useMemo(() => 
        ({ sum: sum.value, 
            comment: comment.value, 
            date: date.value+"T12:00:00.000Z" 
        })
    , [sum, comment, date])

    const onEnter = (e) => {
        if (e.key === "Enter") { funcToCloseOk(funcToCloseOkArgs) }
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
            id="sum"
            label="Сумма"
            type="number"
            fullWidth
            variant="standard"
            {...sum}
            onKeyPress={onEnter}
        />
        { commentNeed && 
        <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Комментарий"
            type="text"
            fullWidth
            variant="standard"
            {...comment}
            onKeyPress={onEnter}
            
        />
        }
        <TextField
        id="date"
        label="Дата"
        type="date"
        defaultValue={dateNow}
        onChange={date.onChange}
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
                onClick={() => funcToCloseOk(funcToCloseOkArgs)}>{dialogTitle}</Button>
        </DialogActions>
    </Dialog>
    )
}

export default DialogModal;
