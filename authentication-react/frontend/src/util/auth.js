import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const expirationDate = localStorage.getItem("expiration");
  const expiration = new Date(expirationDate);
  const now = new Date();

  const duration = expiration.getTime() - now.getTime();
  const hours = Math.floor(duration / (1000 * 60 * 60));

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function setAuthToken(token) {
  localStorage.setItem("token", token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());
}

export function clearAuthToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
