import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { cn } from "@/lib/utils"
import { useForm } from "@inertiajs/react"
import { Eye, EyeClosed } from "lucide-react"
import { FormEventHandler, useState } from "react"
import InputError from "./InputError"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [showpassword, setShowPassword] = useState(false)

  const {data, setData, post, errors, processing, reset} = useForm({
    email: '',
    password: ''
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('auth.login'), {
        onFinish: () => reset('password'),
    })
  }

  return (
    <form onSubmit={submit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setData('email', e.target.value)} className={errors.email ? "border-red-600 outline-1 ring-2" : ""} required />
          <InputError message={errors.email} className="mt-2" />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input id="password" type={showpassword ? "text" : "password"} onChange={(e) => setData('password', e.target.value)} placeholder="password" className={errors.email ? "border-red-600 outline-1 ring-2" : ""} required />
            <div className="absolute right-4 bottom-2">
              {
                showpassword ? 
                <Eye className="size-4 text-muted-foreground cursor-pointer" onClick={() => setShowPassword(!showpassword)}/> 
                : 
                <EyeClosed className="size-4 text-muted-foreground cursor-pointer" onClick={() => setShowPassword(!showpassword)}/>
              }
            </div>
          </div>
          <InputError message={errors.password} className="mt-2" />
        </div>
        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? "Loading..." : "Login"}
        </Button>
      </div>
    </form>
  )
}
