import React from 'react';

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const OrderingSelect: React.FC<Props> = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} className="border p-2">
    <option value="">Без сортировки</option>
    <option value="price">Цена ↑</option>
    <option value="-price">Цена ↓</option>
    <option value="name">Название А-Я</option>
    <option value="-name">Название Я-А</option>
  </select>
);

export default OrderingSelect;
