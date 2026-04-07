import React from 'react';
import { getCategoryColor, getCategoryLabel } from '../../utils/categoryColors';

const CategoryBadge = ({ category, size = 'sm' }) => {
  const color = getCategoryColor(category);
  const label = getCategoryLabel(category);

  const padding = size === 'md' ? '5px 14px' : '3px 10px';
  const fontSize = size === 'md' ? '12px' : '10px';

  return (
    <span
      style={{
        backgroundColor: color,
        color: '#fff',
        padding,
        borderRadius: '4px',
        fontSize,
        fontWeight: 700,
        textTransform: 'uppercase',
        display: 'inline-block',
        lineHeight: 1.4,
      }}
    >
      {label}
    </span>
  );
};

export default CategoryBadge;
