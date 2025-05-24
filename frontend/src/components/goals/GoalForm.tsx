import React, { useState, useEffect } from 'react';
import { Goal } from '@/types';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface GoalFormProps {
  goal?: Goal;
  onSubmit: (goalData: Partial<Goal>) => Promise<void>;
  onCancel: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({
  goal,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title,
        description: goal.description,
        completed: goal.completed,
      });
    }
  }, [goal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      onCancel();
    } catch (err: any) {
      console.error('Error submitting goal form:', err);
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement; // Cast to HTMLInputElement to get type
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Enter goal title"
      />

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400"
          placeholder="Enter goal description"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="completed" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
          Mark as completed
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
        >
          {goal ? 'Update Goal' : 'Create Goal'}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm; 