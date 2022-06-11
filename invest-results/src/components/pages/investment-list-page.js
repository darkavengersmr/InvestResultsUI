import React, { Component } from 'react';
import { connect } from "react-redux";

import AppHeader from '../app-header';
import InvestmentList from '../investment-list';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError } from "../../redux-store/actions"
import { withInvestResultsService } from "../hoc"
import { compose } from "../../utils";
import "./pages.css"

class InvestmentListPage extends Component {
    
    componentDidMount() {
        const  { investResultsService, 
                investmentLoaded, 
                investmentRequested, 
                investmentError } = this.props;        
        investmentRequested();
        investResultsService.getInvestments()
            .then((data) => investmentLoaded(data))
            .catch((error) => investmentError(error));
}

    render() {

        const { loading, error } = this.props;                

        if (loading) {            
            return <Spinner />
        }

        if (error) {            
            return <ErrorIndicator />
        }
        
        return (
            <div><div className="with-app-header">
                    <div className="navigate-to-investments">&#128100;</div>   
                    <AppHeader name="Мои.Инвестиции" />
                </div>
                <InvestmentList />
            </div>
        )}
};

const mapStateToProps = (state) => { 
    return {
        loading: state.loading,
        error: state.error,

    }
  }

  const mapDispathToProps = { 
    investmentLoaded,
    investmentRequested,
    investmentError
}

export default compose(
    withInvestResultsService(),
    connect(mapStateToProps, mapDispathToProps)
    )(InvestmentListPage);
