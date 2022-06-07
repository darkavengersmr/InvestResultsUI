import React, { Component } from "react";
import { connect } from "react-redux";

import InvestmentListItem from "../investment-list-item"


import "./investment-list.css"

class InvestmentList extends Component {

    render() {
        const { investments } = this.props;        
        return (
            <div>
                {
                investments.map((investment) => {
                    return (
                        <div key={investment.id}>
                            <InvestmentListItem investment={investment} />
                        </div>
                    )
                })
            }
            </div>
        );
    }
}

const mapStateToProps = (state) => {    
    return {
        investments: state.investments
    }
}


export default connect(mapStateToProps)(InvestmentList);
