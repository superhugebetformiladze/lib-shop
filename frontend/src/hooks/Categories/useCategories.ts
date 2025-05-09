import { useEffect, useState } from 'react';
import { fetchCategories } from '@api/Categories/fetchCategories';
import { ICategory } from '@models/CategoryModel';

const useCategories = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error setting categories:', error);
            }
        };

        fetchData();
    }, []);

    return categories;
};

export default useCategories;
