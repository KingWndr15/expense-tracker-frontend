// src/utils/cookieUtils.js

/**
 * Set a cookie with the specified name, value, and options.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {Object} options - Additional cookie options (e.g., expiration).
 */
export function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // Default options
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    for (const [key, val] of Object.entries(options)) {
        updatedCookie += `; ${key}`;
        if (val !== true) {
            updatedCookie += `=${val}`;
        }
    }

    document.cookie = updatedCookie;
}

/**
 * Get a cookie by name.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

/**
 * Delete a cookie by name.
 * @param {string} name - The name of the cookie to delete.
 */
export function deleteCookie(name) {
    setCookie(name, '', {
        'max-age': -1,
    });
}
