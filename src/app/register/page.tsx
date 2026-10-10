"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!agree) {
      setError('Please agree to the Terms of Service');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phoneNumber, password }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // Auto-login after successful registration
      await signIn('credentials', {
        identifier: email || phoneNumber,
        password,
        redirect: false,
      });
      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Network error — please try again');
      setLoading(false);
    }
  };

  return (
    <main className="w-full flex-grow flex flex-col items-center justify-center bg-surface-container-lowest py-16 px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-md border border-outline-variant/30 p-8">
        <div className="text-center mb-8">
          <h1 className="text-headline-md font-headline-md text-on-surface mb-2">Create an Account</h1>
          <p className="text-body-md text-on-surface-variant">Join Dreamvally to buy and sell easily</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. +8801712345678"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface"
              required
            />
            <p className="text-label-sm text-on-surface-variant mt-1">Must be at least 6 characters long.</p>
          </div>

          <label className="flex items-start gap-3 mt-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
              required
            />
            <span className="text-body-sm text-on-surface-variant">
              I agree to the <Link href="#" className="text-primary hover:underline font-bold">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline font-bold">Privacy Policy</Link>.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container py-3 rounded-xl text-body-lg font-bold shadow-sm active:scale-95 transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-8 text-body-md text-on-surface-variant">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}
