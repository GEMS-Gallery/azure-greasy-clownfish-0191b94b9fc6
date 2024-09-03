import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem key={category} dense>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default CategoryList;
