import React from "react";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const InvestmentListItem = ({ investment }) => {
    const { id, description } = investment;

    let navigate = useNavigate();

    const navigateToDetail = () => {
        navigate(`/investments/${id}`);
    }

    const sum = 100000;
    const ratio = 8;
    return (
        <Card sx={{ mt: "1rem", width: 320 }}>
            <CardContent sx={{ pr: "1rem", pl: "1rem"}}>
                <Typography sx={{ fontSize: 14 }} 
                            color="text.secondary"                             
                            gutterBottom>
                Категория
                </Typography>
                <Typography variant="h6" component="div">
                {description}
                </Typography>
                <Typography color="text.secondary" align="right">
                {ratio}% годовых
                </Typography>
                <Typography variant="h5" component="div" align="right">
                {sum.toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" 
                        variant='contained' 
                        onClick={navigateToDetail}>
                            Подробнее
                </Button>
                <Button size="small" variant="outlined">Пополнить</Button>
                <Button size="small" variant="outlined">Снять</Button>
            </CardActions>
        </Card>
    );
};

export default InvestmentListItem;