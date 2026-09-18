import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="w-full flex-grow flex flex-col items-center justify-center bg-surface-container-lowest py-16 px-4">
      <div className="w-full max-w-md bg-surface rounded-2xl shadow-md border border-outline-variant/30 p-8">
        <div className="text-center mb-8">
          <h1 className="text-headline-md font-headline-md text-on-surface mb-2">Welcome Back</h1>
          <p className="text-body-md text-on-surface-variant">Log in to your EcoMarket account</p>
        </div>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-label-lg font-bold text-on-surface" htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="e.g. name@example.com" className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface" required />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-label-lg font-bold text-on-surface" htmlFor="password">Password</label>
              <Link href="#" className="text-label-sm font-bold text-primary hover:underline">Forgot password?</Link>
            </div>
            <div className="relative">
              <input type="password" id="password" placeholder="••••••••" className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-body-md text-on-surface" required />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[20px]">visibility_off</span>
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container py-3 rounded-xl text-body-lg font-bold shadow-sm active:scale-95 transition-all mt-2">
            Log In
          </button>
        </form>

        <div className="relative flex items-center justify-center my-8">
          <div className="absolute border-t border-outline-variant w-full"></div>
          <span className="relative bg-surface px-4 text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">OR</span>
        </div>

        <div className="flex flex-col gap-3">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container rounded-xl text-on-surface font-bold transition-colors">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-surface-container-lowest border border-outline-variant hover:bg-surface-container rounded-xl text-on-surface font-bold transition-colors">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
            Continue with Facebook
          </button>
        </div>

        <p className="text-center mt-8 text-body-md text-on-surface-variant">
          Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
