import LoginForm from "../auth/components/login-form";

export default function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "28rem", borderRadius: "8px" }}
      >
        <div className="text-center mb-4">
          <h2>Login</h2>
        </div>
        <div className="mb-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
