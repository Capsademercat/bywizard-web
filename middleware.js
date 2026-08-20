import { next } from '@vercel/edge';

/*
  Geolocalización server-side de Vercel (bulletproof).
  Lee el país del visitante desde la red edge de Vercel (por IP) y lo guarda en
  una cookie 'country'. El front (detectCountry) la lee ANTES que ipapi.co /
  api.country.is, así la geo funciona SIEMPRE: sin depender de APIs externas,
  sin que un AdBlock lo rompa, e instantáneo (sin esperar a ninguna petición).
*/
export const config = { matcher: '/' };

export default function middleware(request) {
  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const res = next();
  if (/^[A-Z]{2}$/.test(country)) {
    res.headers.append('Set-Cookie', `country=${country}; Path=/; Max-Age=3600; SameSite=Lax`);
  }
  return res;
}
