import React from "react";
import "./investment-list-item.css";

const InvestmentListItem = ({ investment }) => {
    const { description } = investment;

    const sum = 100000;
    const ratio = 8;
    return (
        <div className='list-item'>
            <div className='first-row'>
                <div className='description'>{description}</div>                   
                <div className='sum'>{sum.toLocaleString()}</div>
            </div>
            <div className='second-row'>
                <div className='buttons'>
                    <button type="button" className="btn btn-primary button">Пополнить</button>
                    <button type="button" className="btn btn-primary button">Снять</button>                
                </div>
                <div className='ratio'>{ratio}%</div>
            </div>
            
        </div>
    );
};

export default InvestmentListItem;