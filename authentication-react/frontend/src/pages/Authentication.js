import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";
import { setAuthToken } from "../util/auth";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request, params }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch("http://localhost:8081/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Failed to authenticate." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;

  setAuthToken(token);

  return redirect("/");
}
