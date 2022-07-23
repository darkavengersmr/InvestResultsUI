import React, { useMemo } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useInput } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../redux-store/actions';

const DialogModal = ({ triggerToOpen, 
                       funcToCloseOk, 
                       funcToCloseCancel, 
                       dialogTitle, 
                       dialogContentText,
                       commentNeed                       
                    }) => {

    const dispatch = useDispatch();

    const dateNow = useMemo(() => {
        const date = new Date();
        return date.getFullYear() + '-' + 
            String(date.getMonth() + 1).padStart(2, '0') + '-' + 
            String(date.getDate()).padStart(2, '0');
    }, [])

    const sum = useInput('', 'positiveNumber')
    const comment = useInput('', 'notNullText')
    const date = useInput(dateNow)

    const funcToCloseOkArgs = useMemo(() => 
        ({ sum: sum.value, 
            comment: comment.value, 
            date: date.value+"T12:00:00.000Z" 
        })
    , [sum, comment, date])

    const onSubmit = () => {
        if (!sum.value || (commentNeed && !comment.value)) {
            dispatch(setNotification({
                text: "не заполнены обязательные поля",
                type: "error"
              }))
        } else {
            funcToCloseOk(funcToCloseOkArgs) 
        }
    }

    const onEnter = (e) => {
        if (e.key === "Enter") onSubmit()                     
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
                onClick={onSubmit}>{dialogTitle}</Button>
        </DialogActions>
    </Dialog>
    )
}

export default DialogModal;
