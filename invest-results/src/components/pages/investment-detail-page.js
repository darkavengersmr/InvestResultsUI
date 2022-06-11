import React, { Component } from 'react';
import { connect } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

import AppHeader from '../app-header';
import InvestmentDetail from '../investment-detail';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError,
         historyRequested, historyLoaded, historyError, 
         inOutRequested, inOutLoaded, inOutError } from "../../redux-store/actions"
import { withInvestResultsService } from "../hoc"
import { compose } from "../../utils";
import "./pages.css"

class InvestmentDetailPage extends Component {
    
    componentDidMount() {
        const  { investResultsService,
                investmentLoaded, investmentRequested, investmentError, 
                historyRequested, historyLoaded, historyError,
                inOutRequested, inOutLoaded, inOutError } = this.props;
        const { id } = this.props.params;

        investmentRequested();
        investResultsService.getInvestments()
            .then((data) => investmentLoaded(data))
            .catch((error) => investmentError(error));
        
        historyRequested();
        inOutRequested();
        investResultsService.getHistory(id)
            .then((data) => historyLoaded(data))
            .catch((error) => historyError(error));
        investResultsService.getInOut(id)
            .then((data) => inOutLoaded(data))
            .catch((error) => inOutError(error));
    }

    render() {

        const { investments, loading, error} = this.props;
        
        const { id } = this.props.params;
        const navigate = this.props.navigate;

        if (loading) {            
            return <Spinner />
        }

        if (error) {            
            return <ErrorIndicator />
        }
        
        let description;
        try {
          const investment_item = investments.filter((investment_item) => 
                                                     investment_item.id == id);
          description = investment_item[0].description;
          
        } catch {
            return <ErrorIndicator />
        }
        
        const navigateToInvestment = () => {
            navigate('/investments');
        }

        return (
            <div>
                
                <div className="with-app-header" onClick={navigateToInvestment}>
                    <div className="navigate-to-investments">&#5130;</div>                    
                    <AppHeader name={description} />    
                </div>
                
                <InvestmentDetail id={id} />
            </div>
        )}
};

const mapStateToProps = (state) => {    

    return {
        investments: state.investments,
        loading: state.loading,
        error: state.error,

    }
  }

  const mapDispathToProps = {
    investmentLoaded, 
    investmentRequested, 
    investmentError, 
    historyRequested,
    historyLoaded,
    historyError,
    inOutRequested,
    inOutLoaded,
    inOutError
}

export default compose(
    withInvestResultsService(),
    connect(mapStateToProps, mapDispathToProps)
    )((props) => (        
        <InvestmentDetailPage
            {...props}
            params={useParams()}
            navigate={useNavigate()}
   />));
