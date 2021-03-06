import React, { useMemo, memo } from "react";

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const CategoriesListItem = memo(({ category_item, onDelCategory }) => {
    const { category, id } = useMemo(() => category_item, [category_item]);    
    return (
        <TableRow>            
            <TableCell>{category}</TableCell>
            <TableCell align="right">
                <IconButton aria-label="delete" onClick={() => onDelCategory(id)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
})

export default CategoriesListItem;