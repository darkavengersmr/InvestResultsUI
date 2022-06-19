import React from "react";

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoriesListItem = ({ category_item }) => {
    const { category } = category_item;
    return (
        <TableRow>            
            <TableCell>{category}</TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default CategoriesListItem;