export const getToken = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return localStorage.getItem("token");
};

export const getRole = () => {
    const token = getToken();

    if (!token) {
        return null;
    }

    const payload = token.split(".")[1];

    if (!payload) {
        return null;
    }

    const base64 = payload
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const decodedPayload = JSON.parse(
        atob(base64)
    );

    return decodedPayload.role;
};

export const isAdmin = () => {
    return getRole() === "ADMIN";
};

export const isUser = () => {
    return getRole() === "USER";
};

export const logout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
};