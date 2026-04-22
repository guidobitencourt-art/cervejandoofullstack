import { useQuery } from '@tanstack/react-query'

// Hook: useCervezasRQ
// Hook que encapsula la llamada a la API `/api/cervezas` usando React Query.
// Provee la lista de cervezas y estados de carga/ error reutilizables en la UI.
export type Cerveza = {
  _id?: string
  tipo: string
  descripcion: string
  temperatura_ideal?: string
  copa?: string
  abv?: string
  ibu?: string
}

async function fetchCervezas(): Promise<Cerveza[]> {
  const res = await fetch('/api/cervezas')
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export function useCervezasRQ() {
  return useQuery<Cerveza[], Error>({
    queryKey: ['cervezas'],
    queryFn: fetchCervezas,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
    retry: 1,
  })
}

export default useCervezasRQ
