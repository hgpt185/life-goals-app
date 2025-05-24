import React from 'react';
import { Goal } from '@/types';
import Button from '../ui/Button';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onToggleComplete: (goalId: string, completed: boolean) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
        <span className={`px-2 py-1 text-sm rounded-full ${
          goal.completed 
            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
            : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
        }`}>
          {goal.completed ? 'Completed' : 'In Progress'}
        </span>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">{goal.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onEdit(goal)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(goal.id)}
          >
            Delete
          </Button>
        </div>
        
        <Button
          size="sm"
          variant={goal.completed ? 'secondary' : 'primary'}
          onClick={() => onToggleComplete(goal.id, !goal.completed)}
        >
          {goal.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </Button>
      </div>
    </div>
  );
};

export default GoalCard; 