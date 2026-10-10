import { withAuth } from 'next-auth/middleware';

export default withAuth({ pages: { signIn: '/login' } });

export const config = {
  matcher: [
    // Protect all seller routes except register (which handles its own session check)
    '/seller/dashboard/:path*',
    '/seller/products/:path*',
    '/seller/add-product/:path*',
    '/seller/orders/:path*',
    '/seller/verification/:path*',
    '/seller/settings/:path*',
  ],
};
