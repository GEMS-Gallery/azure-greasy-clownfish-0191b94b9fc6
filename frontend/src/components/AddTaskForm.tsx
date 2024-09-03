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
