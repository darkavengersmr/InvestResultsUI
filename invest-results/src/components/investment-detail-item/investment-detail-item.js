import React from "react";
import "./investment-detail-item.css";

const InvestmentListItem = ({ data, date }) => {    
    const { history, sum_in, sum_out } = data;

    if (history != undefined && sum_in != undefined && sum_out != undefined) {
    return (
        <div className='investments-detail'>
            <div className='investments-detail-item'>
                <div className='investments-detail-item-date'>{date}</div>
                <div className='investments-detail-item-sum'>{history.toLocaleString()}</div>
                <div className='investments-detail-item-sum'>{sum_in.toLocaleString()}</div>
                <div className='investments-detail-item-sum'>{sum_out.toLocaleString()}</div>
            </div>                    
        </div>    
    );
    }
    
};

export default InvestmentListItem;