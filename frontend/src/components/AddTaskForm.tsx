import React, { useState } from 'react';

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
      case 'work': return 'briefcase';
      case 'personal': return 'user';
      case 'shopping': return 'shopping-bag';
      case 'health': return 'heart';
      default: return 'circle';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <select
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            <i data-feather={getCategoryIcon(cat)} className="category-icon"></i>
            {cat}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" className="button">
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
