import React, { Component } from 'react';
import { connect } from "react-redux";

import AppHeader from "../app-header"
import CategoriesList from '../categories-list';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { categoriesLoaded, categoriesRequested, categoriesError} from "../../redux-store/actions"
import { withInvestResultsService } from "../hoc"
import { compose } from "../../utils";
import "./pages.css"

class CategoriesListPage extends Component {
    
    componentDidMount() {
        const  { investResultsService, 
                categoriesLoaded, 
                categoriesRequested, 
                categoriesError } = this.props;
        categoriesRequested();
        investResultsService.getCategories()
            .then((data) => categoriesLoaded(data))
            .catch((error) => categoriesError(error));
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
                <AppHeader name="Категории инвестиций"/>
                <CategoriesList />
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
    categoriesLoaded,
    categoriesRequested,
    categoriesError
}

export default compose(
    withInvestResultsService(),
    connect(mapStateToProps, mapDispathToProps)
    )(CategoriesListPage);
