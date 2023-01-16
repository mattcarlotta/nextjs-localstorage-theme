export default function fetchAPI(url: string, options?: RequestInit) {
  const API_URL = process.env.NEXT_PUBLIC_HOST
  return fetch(`${API_URL}${url}`, options)
}
