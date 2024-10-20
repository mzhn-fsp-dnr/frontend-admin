"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import signInForm, { SignInDto } from "@/lib/forms/sign-in";
// import authStorageService from "@/services/auth-storage.service";
// import authService from "@/services/auth.service";
// import userStorageService from "@/services/user-storage.service";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "@/service/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "@/lib/zod";

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInForm>>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit: SubmitHandler<SignInDto> = async (data) => {
    try {
      await signIn(data);
      toast({
        title: "Вход выполнен",
        description: `Добро пожаловать!`,
      });
      router.push("/");
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Неправильный логин/пароль",
      });
    }
  };

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Авторизация</CardTitle>
        <CardDescription>Пожалуйста, войдите в систему.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input placeholder="operator" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder="●●●●●●●●" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 active:bg-blue-600"
            >
              Вход
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
