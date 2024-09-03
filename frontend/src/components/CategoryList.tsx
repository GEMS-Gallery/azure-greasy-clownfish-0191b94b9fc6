import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return <WorkIcon />;
      case 'personal': return <PersonIcon />;
      case 'shopping': return <ShoppingCartIcon />;
      case 'health': return <FavoriteIcon />;
      default: return <CircleIcon />;
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul className="list">
        {categories.map((category) => (
          <li key={category} className="list-item">
            {getCategoryIcon(category)}
            <span style={{ marginLeft: '10px' }}>{category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
