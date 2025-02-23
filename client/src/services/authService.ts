export const login = async (data: { username: string; password: string }, csrf: string | null) => {
    try {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (csrf) {
            headers["X-CSRFToken"] = csrf;
        }

        const res = await fetch("http://localhost:8000/users/login/", {
            method: "POST",
            headers: headers,
            credentials: "include",
            body: JSON.stringify(data),
        });

        const respData = await res.json();

        if (!res.ok) {
            throw new Error(`${res.status}: ${respData.error}`);
        }

        return respData;
    } catch (err) {
        console.error("Login failed:", err);
        throw err;
    }
};


export const register = async (data: any, csrf: string | null) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
  
    if (csrf) {
      headers["X-CSRFToken"] = csrf;
    }
  
    const res = await fetch("http://localhost:8000/users/register/", {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(data),
    });
    
    return await res.json();
  };


export const getSession = async () => {
    try {
        const res = await fetch("http://localhost:8000/users/session/", {
            credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(`${res.status}: ${data.error}`);
        }

        return data;
    } catch (err) {
        console.error("Session fetch failed:", err);
        throw err;
    }
};


export const getCSRF = async () => {
    try {
        const res = await fetch("http://localhost:8000/users/csrf/", {
            credentials: "include",
        });
        const csrfToken = res.headers.get("X-CSRFToken");
        return csrfToken;
    } catch (err) {
        console.error("CSRF fetch failed:", err);
        throw err;
    }
};


export const whoami = async () => {
    try {
        const res = await fetch("/users/whoami", {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();

        if(!res.ok) {
            throw new Error(`${res.status}: ${data.error}`);
        }

        console.log(`You are logged in as ${data.username}`);
    } catch (err) {
        console.log(err);
    }
}


export const logout = async () => {
    try {
      const res = await fetch("http://localhost:8000/users/logout/", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(`${res.status}: ${data.error}`);

    } catch (err) {
      console.error("Error logging out:", err);
    }
  };