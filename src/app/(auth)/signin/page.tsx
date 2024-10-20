"use client";

import SignInForm from "@/components/auth/sign-in-form";
import * as Alert from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { authStorage } from "@/lib/storage";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();

  const [alertOpened, setAlertOpened] = useState(false);
  const user = authStorage().get();

  if (user !== undefined && params.get("skip_check")) {
    router.replace("/");
  }

  return (
    <div className="flex flex-col">
      <SignInForm />
      <Button
        className="h-6 pt-6 opacity-75"
        variant="link"
        onClick={(e) => setAlertOpened(true)}
      >
        Забыли пароль?
      </Button>

      <Alert.AlertDialog open={alertOpened} onOpenChange={setAlertOpened}>
        <Alert.AlertDialogContent>
          <Alert.AlertDialogHeader>
            <Alert.AlertDialogTitle className="text-lg font-semibold">
              Забыли пароль?
            </Alert.AlertDialogTitle>
            <Alert.AlertDialogDescription>
              Пожалуйста, обратитесь к техническому отделу для восстановления
              доступа.
            </Alert.AlertDialogDescription>
          </Alert.AlertDialogHeader>
          <Alert.AlertDialogFooter>
            <Alert.AlertDialogCancel>Закрыть</Alert.AlertDialogCancel>
          </Alert.AlertDialogFooter>
        </Alert.AlertDialogContent>
      </Alert.AlertDialog>
    </div>
  );
}
