import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';

interface AddTaskFormProps {
  categories: string[];
  onAddTask: (category: string, description: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ categories, onAddTask }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category && description) {
      onAddTask(category, description);
      setCategory('');
      setDescription('');
    }
  };

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
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <FormControl fullWidth margin="normal">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {getCategoryIcon(cat)}
              <span style={{ marginLeft: '10px' }}>{cat}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
        Add Task
      </Button>
    </form>
  );
};

export default AddTaskForm;
