import React from "react";
import { useSelector } from 'react-redux'
import Container from '@mui/material/Container';

import InvestmentListItem from "../investment-list-item"

const InvestmentList = () => {

    const investments = useSelector((state) => state.investments);
  
    return (
        <>
        <Container sx={{ width: 360 }}>
            {
            investments.map((investment) => {
                return <InvestmentListItem key={investment.id} investment={investment} />
                })
            }
        </Container>
        </>
    );
}

export default InvestmentList;
