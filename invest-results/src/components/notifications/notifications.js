import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from "../../redux-store/actions"

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
// notification types : success, error, warning, info

  export default function Notification() {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(false);
    const [type, setType] = useState(false);

    const { notification } = useSelector((state) => state);
    
    const dispatch = useDispatch();

    useEffect(() => {
      if (notification.text !== "") {
        setText(notification.text);
        setType(notification.type);
        setOpen(true);
        dispatch(setNotification({
            text: "",
            type: ""
        }))
      }
    }, [dispatch, notification]);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {text}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }