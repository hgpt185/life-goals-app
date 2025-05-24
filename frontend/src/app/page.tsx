'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Track and Achieve Your</span>
            <span className="block text-blue-600">Life Goals</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Set meaningful goals, track your progress, and turn your dreams into reality.
            Start your journey to personal growth and achievement today.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            {user ? (
              <Button
                size="lg"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => router.push('/login')}
                >
                  Sign In
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => router.push('/register')}
                >
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Set Clear Goals</h3>
            <p className="mt-2 text-gray-500">
              Define your life goals with clarity and purpose. Break them down into
              achievable milestones.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Track Progress</h3>
            <p className="mt-2 text-gray-500">
              Monitor your progress with our intuitive tracking system. Stay motivated
              by seeing how far you've come.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900">Achieve Success</h3>
            <p className="mt-2 text-gray-500">
              Turn your dreams into reality. Celebrate your achievements and continue
              growing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
