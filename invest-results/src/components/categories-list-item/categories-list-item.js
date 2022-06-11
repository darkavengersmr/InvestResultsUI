import React from "react";
import "./categories-list-item.css";

const CategoriesListItem = ({ category_item }) => {
    const { category } = category_item;
    return (
        <div className='category-list-item'>            
            <div className='description'>{category}</div>
            <button className="btn btn-link wastebasket">&#x1f5d1;</button>
        </div>
    );
};

export default CategoriesListItem;