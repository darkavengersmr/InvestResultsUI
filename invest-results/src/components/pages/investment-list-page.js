import React, { Component } from 'react';
import { connect } from "react-redux";

import InvestmentList from '../investment-list';
import AppHeader from '../app-header';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { investmentLoaded, investmentRequested, investmentError} from "../../redux-store/actions"
import { withInvestResultsService } from "../hoc"
import { compose } from "../../utils";

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
            <div>
                <AppHeader /> 
                <InvestmentList />
            </div>
        )}
};

const mapStateToProps = (state) => {    
    return {
        loading: state.loading,
        error: state.error
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
