import React, { Component } from "react";
import { connect } from "react-redux";

import InvestmentDetailItem from "../investment-detail-item"
import "./investment-detail.css"

class InvestmentDetail extends Component {

    render() {
        const test = this.props;
        
        const { id, history, inout } = this.props;        
        
        const investment_detail_item = {}

        history.forEach((element) => {        
            if (element.investment_id == id) {
                const date = element.date.slice(0,7);                
                investment_detail_item[date] = {history: element.sum}                
            }
        });
        
        inout.forEach((element) => {        
            if (element.investment_id == id) {
                const date = element.date.slice(0,7);                              
                if (!(date in investment_detail_item)) {
                    investment_detail_item[date] = {history: null}
                }
                investment_detail_item[date].sum_in = 0;
                investment_detail_item[date].sum_out = 0;
                if (element.sum >= 0) {                        
                    investment_detail_item[date].sum_in += element.sum                        
                } else {
                    investment_detail_item[date].sum_out += -1 * element.sum                        
                }                    
            }
            
        });
               
        return (
            <div>
                <div>
                    <div className='investments-detail-header'>
                        <div className='investments-detail-item-header'>Дата</div>
                        <div className='investments-detail-item-header'>Сумма</div>
                        <div className='investments-detail-item-header'>Приход</div>
                        <div className='investments-detail-item-header'>Расход</div>
                    </div>
                </div>
                <div>
                    <div>
                        {                
                        Object.keys(investment_detail_item).map(function(key, index) {                    
                                return (
                                    <div key={key}>
                                        <InvestmentDetailItem date={key} data={investment_detail_item[key]}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            
        );
        
    }
}

const mapStateToProps = (state) => {    
    return {
        history: state.history,
        inout: state.inout
    }
}


export default connect(mapStateToProps)(InvestmentDetail);
