import React from 'react';

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return 'briefcase';
      case 'personal': return 'user';
      case 'shopping': return 'shopping-bag';
      case 'health': return 'heart';
      default: return 'circle';
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul className="list">
        {categories.map((category) => (
          <li key={category} className="list-item">
            <i data-feather={getCategoryIcon(category)} className="category-icon"></i>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
