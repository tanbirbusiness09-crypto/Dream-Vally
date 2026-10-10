"use client";

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      identifier,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid email/phone or password');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-label-lg font-bold text-on-surface" htmlFor="identifier">Email or Phone</label>
        <input
          type="text"
          id="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="name@example.com or +8801711000001"
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label className="text-label-lg font-bold text-on-surface" htmlFor="password">Password</label>
          <span className="text-[11px] text-on-surface-variant">Demo: demo@dreamvally.com / demo1234</span>
        </div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container py-3 rounded-xl text-body-lg font-bold shadow-sm active:scale-95 transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="w-full flex-grow flex flex-col items-center justify-center bg-surface-container-lowest py-16 px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-md border border-outline-variant/30 p-8">
        <div className="text-center mb-8">
          <h1 className="text-headline-md font-headline-md text-on-surface mb-2">Welcome Back</h1>
          <p className="text-body-md text-on-surface-variant">Log in to your Dreamvally account</p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>

        <p className="text-center mt-8 text-body-md text-on-surface-variant">
          Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
