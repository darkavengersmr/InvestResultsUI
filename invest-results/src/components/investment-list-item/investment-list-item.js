import React from "react";
import { useNavigate } from 'react-router-dom';
import "./investment-list-item.css";

const InvestmentListItem = ({ investment }) => {
    const { id, description } = investment;

    let navigate = useNavigate();

    const navigateToDetail = () => {
        navigate(`/investments/${id}`);
    }

    const sum = 100000;
    const ratio = 8;
    return (

        <div className='investments-list-item'>            
            <div onClick={navigateToDetail} className='first-row'>
                <div className='description'>{description}</div>                   
                <div className='sum'>{sum.toLocaleString()}</div>
            </div>

            <div className='second-row'>
                <div className='buttons'>
                    <button type="button" className="btn btn-primary button_in">Пополнить</button>
                    <button type="button" className="btn btn-success button_out">Снять</button>                
                </div>
                <div onClick={navigateToDetail} className='ratio'>{ratio}%</div>
            </div>
            
        </div>
    );
};

export default InvestmentListItem;