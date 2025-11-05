import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IFormData {
  email: string;
  password: string;
}

export function SignIn() {
  const { signIn } = useAuth();
  const form = useForm<IFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await signIn({ email, password });
    } catch (error) {
      toast.error("Credenciais invalidas");
    }
  });

  return (
    <div className="min-h-screen flex flex-col justify-center mx-auto max-w-[480px] p-6">
      <h1 className="font-semibold text-xl">Acesse sua conta</h1>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-2">
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...form.register("email")} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...form.register("password")} />
        </div>

        <Button className="mt-3" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </div>
  );
}
