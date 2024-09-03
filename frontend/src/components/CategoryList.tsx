import React from 'react';

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div>
      <h2>Categories</h2>
      <ul className="list">
        {categories.map((category) => (
          <li key={category} className="list-item">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
