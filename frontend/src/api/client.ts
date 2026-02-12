const API_BASE = "/api";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Token ${token}`;
  }
  return headers;
}

export async function apiLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data;
}

export async function apiGetCurrentUser() {
  const res = await fetch(`${API_BASE}/auth/me/`, {
    headers: getAuthHeaders(),
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to get user");
  const data = await res.json();
  return data.user;
}

export async function apiLogout() {
  await fetch(`${API_BASE}/auth/logout/`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
}
