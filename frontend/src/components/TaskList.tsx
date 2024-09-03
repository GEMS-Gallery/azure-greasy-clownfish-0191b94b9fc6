import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: bigint;
  category: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: bigint) => void;
  onDeleteTask: (taskId: bigint) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id.toString()} dense button>
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => onCompleteTask(task.id)}
              disabled={task.completed}
            />
            <ListItemText
              primary={task.description}
              secondary={task.category}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default TaskList;
