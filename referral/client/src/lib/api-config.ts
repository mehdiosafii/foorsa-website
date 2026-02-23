/**
 * API Configuration for Referral Engine
 * 
 * When integrated into foorsa.ma, all API calls should be prefixed with /referral/api
 */

export const API_BASE = '/referral/api';

/**
 * Helper function to build API URLs
 */
export function apiUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE}/${cleanPath}`;
}

/**
 * Fetch wrapper with automatic API base path
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(apiUrl(path), options);
}
