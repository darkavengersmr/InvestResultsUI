import React, { Component } from "react";
import { connect } from "react-redux";

import CategoriesListItem from "../categories-list-item"


import "./categories-list.css"

class CategoriesList extends Component {

    render() {
        const { categories } = this.props;        
        return (
            <div>
                {
                categories.map((category) => {
                    return (
                        <div key={category.id}>
                            <CategoriesListItem category_item={category} />
                        </div>
                    )
                })
            }
                <div className='add-category'>
                    <input className="input-category-description" type="text"/>
                    <button className="btn btn-primary button">Добавить</button>        
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {    
    return {
        categories: state.categories
    }
}


export default connect(mapStateToProps)(CategoriesList);
