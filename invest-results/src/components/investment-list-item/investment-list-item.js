import React, { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const InvestmentListItem = ({ investment }) => {

    const { id, description, sum, category, proc, is_active } = investment;

    let navigate = useNavigate();

    const navigateToDetail = useCallback(() => {
        navigate(`/investments/${id}`);
    }, [navigate, id]);

    return (
        <>
        <Card sx={{ mt: "1rem", width: 320 }}>
            <CardContent sx={{ pr: "1rem", pl: "1rem"}}>
                <Typography sx={{ fontSize: 14, mb: 0 }} 
                            color="text.secondary"                             
                            gutterBottom>
                {is_active ? category : "Архив"}
                </Typography>
                <Typography variant="h6" component="div">
                {description}
                </Typography>
                
                <Grid container alignItems="flex-end">
                    <Grid sx={{ width: 140 }} >
                        <CardActions sx={{ p: 0 }}>
                            <Button size="small" sx={{ p: 0 }}
                                    onClick={navigateToDetail}>
                                    Подробнее
                            </Button>
                        </CardActions>
                    </Grid>
                    <Grid sx={{ width: 140 }}>
                        {proc > 0 ?
                        <Typography color="#00FF00" align="right">
                        {proc}%
                        </Typography> :
                        <Typography color="#FF0000" align="right">
                        {proc}%
                        </Typography>
                        }                        
                        <Typography variant="h5" component="div" align="right">
                        {sum.toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            
        </Card>
        </>
    );
};

export default InvestmentListItem;