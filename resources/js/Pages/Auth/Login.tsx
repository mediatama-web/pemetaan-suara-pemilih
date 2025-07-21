import { LoginForm } from "@/Components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded shadow p-6">
        <LoginForm />
      </div>
    </div>
  )
}
