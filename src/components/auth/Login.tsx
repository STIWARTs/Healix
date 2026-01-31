import { useState } from 'react';
import { supabase } from '../../services/supabase';
import Button from '../ui/Button';
import logo from '../../assets/logo.png';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass rounded-2xl shadow-lg border border-sage-light/40 p-6 md:p-8 animate-fade-in">
        <div className="flex flex-col items-center text-center gap-4">
          {/* Logo Icon */}
          <img 
            src={logo} 
            alt="Healix Wellness" 
            className="w-20 h-20 object-contain"
          />
          
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome back</h1>
            <p className="text-sm text-gray-600">Sign in to continue your wellness journey</p>
          </div>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleLogin}
            disabled={loading}
            className="!w-full !h-12 !px-4 text-sm font-semibold btn-glow"
          >
            {loading ? 'Signing in…' : 'Continue with Google'}
          </Button>

          <p className="mt-4 text-xs text-slate-500 text-center">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
