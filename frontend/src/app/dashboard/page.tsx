'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getGoals, createGoal, updateGoal, deleteGoal } from '@/utils/api';
import { Goal } from '@/types';
import GoalCard from '@/components/goals/GoalCard';
import GoalForm from '@/components/goals/GoalForm';
import Button from '@/components/ui/Button';
import DarkModeToggle from '@/components/ui/DarkModeToggle';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>();

  useEffect(() => {
    // Wait for auth to initialize before checking authentication
    if (!authLoading) {
      if (!isAuthenticated()) {
        router.push('/login');
      } else {
        fetchGoals();
      }
    }
  }, [authLoading, isAuthenticated, router]);

  const fetchGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (err: any) {
      // If we get a 401, the token is invalid and the interceptor will handle logout
      if (err.response?.status !== 401) {
        setError('Failed to fetch goals');
      }
      console.error('Error fetching goals:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateGoal = async (goalData: Partial<Goal>) => {
    try {
      const newGoal = {
        title: goalData.title || '',
        description: goalData.description || '',
        completed: goalData.completed || false,
      };
      await createGoal(newGoal);
      await fetchGoals();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create goal');
      console.error('Error creating goal:', err);
    }
  };

  const handleUpdateGoal = async (goalData: Partial<Goal>) => {
    if (!selectedGoal) return;
    try {
      await updateGoal(selectedGoal.id, goalData);
      await fetchGoals();
      setShowForm(false);
      setSelectedGoal(undefined);
    } catch (err) {
      setError('Failed to update goal');
      console.error('Error updating goal:', err);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
      await fetchGoals();
    } catch (err) {
      setError('Failed to delete goal');
      console.error('Error deleting goal:', err);
    }
  };

  const handleToggleComplete = async (goalId: string, completed: boolean) => {
    try {
      await updateGoal(goalId, { completed });
      await fetchGoals();
    } catch (err) {
      setError('Failed to update goal');
      console.error('Error updating goal:', err);
    }
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated()) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const completedGoals = goals.filter(goal => goal.completed);
  const inProgressGoals = goals.filter(goal => !goal.completed);
  const completionRate = goals.length > 0 
    ? Math.round((completedGoals.length / goals.length) * 100) 
    : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {getGreeting()}, {user?.name}! 👋
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Track your progress and achieve your dreams, one step at a time.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <DarkModeToggle />
            <Button onClick={() => setShowForm(true)}>
              Add New Goal
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Goals</h3>
            <p className="mt-2 text-3xl font-semibold text-blue-900 dark:text-blue-100">{goals.length}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Completed</h3>
            <p className="mt-2 text-3xl font-semibold text-green-900 dark:text-green-100">{completedGoals.length}</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">In Progress</h3>
            <p className="mt-2 text-3xl font-semibold text-yellow-900 dark:text-yellow-100">{inProgressGoals.length}</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Success Rate</h3>
            <p className="mt-2 text-3xl font-semibold text-purple-900 dark:text-purple-100">{completionRate}%</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {showForm && (
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {selectedGoal ? 'Edit Goal' : 'Create New Goal'}
          </h2>
          <GoalForm
            goal={selectedGoal}
            onSubmit={selectedGoal ? handleUpdateGoal : handleCreateGoal}
            onCancel={() => {
              setShowForm(false);
              setSelectedGoal(undefined);
            }}
          />
        </div>
      )}

      {/* In Progress Goals Section */}
      {inProgressGoals.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Goals in Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={(goal) => {
                  setSelectedGoal(goal);
                  setShowForm(true);
                }}
                onDelete={handleDeleteGoal}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Goals Section */}
      {completedGoals.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Completed Goals 🎉
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={(goal) => {
                  setSelectedGoal(goal);
                  setShowForm(true);
                }}
                onDelete={handleDeleteGoal}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        </div>
      )}

      {goals.length === 0 && !showForm && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Welcome to Your Journey!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Ready to start achieving your dreams? Create your first life goal and begin your journey to success.
          </p>
          <Button onClick={() => setShowForm(true)}>Create Your First Goal</Button>
        </div>
      )}
    </div>
  );
} 