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

// Profile API
export interface Profile {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  bio: string;
  avatar_url: string | null;
  country: string;
  city_state: string;
  postal_code: string;
  tax_id: string;
  facebook_url: string;
  x_url: string;
  linkedin_url: string;
  instagram_url: string;
}

export async function apiGetProfile(): Promise<Profile> {
  const res = await fetch(`${API_BASE}/profile/`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Failed to get profile");
  return res.json();
}

export async function apiUpdateProfile(data: Partial<Profile>): Promise<Profile> {
  const res = await fetch(`${API_BASE}/profile/`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || JSON.stringify(err));
  }
  return res.json();
}

export async function apiUploadAvatar(file: File): Promise<Profile> {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch(`${API_BASE}/profile/avatar/`, {
    method: "POST",
    headers: token ? { Authorization: `Token ${token}` } : {},
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Upload failed");
  }
  return res.json();
}
