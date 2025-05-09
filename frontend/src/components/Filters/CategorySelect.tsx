import React from 'react';
import { ICategory } from '@models/CategoryModel';

interface Props {
    value?: number;
    onChange: (value: number | undefined) => void;
    categories: ICategory[];
}

const CategorySelect: React.FC<Props> = ({ value, onChange, categories }) => (
    <select
        value={value || ''}
        onChange={(e) => onChange(Number(e.target.value) || undefined)}
        className="border p-2"
    >
        <option value="">Все категории</option>
        {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
                {cat.name}
            </option>
        ))}
    </select>
);

export default CategorySelect;
