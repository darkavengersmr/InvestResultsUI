import React from "react";
import Container from '@mui/material/Container';

import InvestmentListItem from "../investment-list-item"

const InvestmentList = ({ investments }) => {
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
