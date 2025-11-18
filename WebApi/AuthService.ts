
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("sessionId");
  window.location.href = "/login";
};

// Login durumunu kontrol et
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  const sessionId = localStorage.getItem("sessionId");
  return !!(token && sessionId);
};

// JWT token'dan kullanıcı bilgilerini çıkaran yardımcı fonksiyon
export const getCurrentUserId = (): number => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return 0;

    const base64Url = token.split('.')[1];
    if (!base64Url) return 0;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const payload = JSON.parse(jsonPayload);
    return payload.userId || payload.sub || payload.nameid || 0;
  } catch (error) {
    console.error('Token decode hatası:', error);
    return 0;
  }
};

// Fetch ile token destekli API çağrısı
export const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const sessionId = localStorage.getItem("sessionId");

  if (!token || !sessionId) {
    logout();
    throw new Error("Authentication required");
  }

 const headers = {
  "Authorization": `Bearer ${token}`,
  "X-Session-Id": sessionId,
  "Content-Type": "application/json",
  ...(options.headers as Record<string, string> || {})
};

  try {
    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      if (res.status === 401) {
        logout();
      }
      const text = await res.text();
      throw new Error(`API call failed: ${res.status} ${res.statusText} - ${text}`);
    }

    // JSON parse
    return await res.json();
  } catch (error) {
    console.error("fetchWithToken hatası:", error);
    throw error;
  }
};