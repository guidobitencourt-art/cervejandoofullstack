// Utilidad: authFetch
// - Envuelve fetch para inyectar el header `Authorization: Bearer <token>` si existe en localStorage.
// - Normaliza errores devolviendo un objeto Error con detalles cuando la petición falla.
export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers = new Headers(init.headers || {});
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(input, { ...init, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    let json: any = null;
    try { json = JSON.parse(text); } catch (e) { json = { message: text }; }
    const err: any = new Error(json.error || json.message || 'Request failed');
    err.status = res.status;
    err.body = json;
    throw err;
  }
  return res.json().catch(() => null);
}
