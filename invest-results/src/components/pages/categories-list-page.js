import React from 'react';

import AppHeader from "../app-header"
import CategoriesList from '../categories-list';
import Spinner from "../spinner"
import ErrorIndicator from '../error-indicator';
import { useCategories } from '../../hooks';

const CategoriesListPage = () => {
    
    const { categories, loading, error, addCategory, delCategory } = useCategories();

    if (loading) {            
        return <Spinner />
    }

    if (error) {            
        return <ErrorIndicator />
    }
    
    return (
        <div>
            <AppHeader name="Категории инвестиций" />
            <CategoriesList categories={categories}
                            onAddCategory={addCategory}
                            onDelCategory={delCategory}
                            />
        </div>
    )
};

export default CategoriesListPage;
