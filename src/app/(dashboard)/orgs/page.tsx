"use client";

import { all, remove } from "@/api/orgs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { PageHeader, PageTitle } from "../components/ui";
import OrganizationNewDialog from "./components/org-new-dialog";

function RemoveConfirmation({ id }: { id: string }) {
  async function removeOrg(id: string) {
    await remove(id);
    location.reload();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" className="bg-red-400">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы действительно хотите удалить отделение из системы?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeOrg(id)}>
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function Page() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["orgs"],
    queryFn: all,
  });

  if (isError) return <>error</>;
  if (isLoading) return <>loading</>;

  return (
    <section className="flex w-full flex-col gap-8 px-8 py-4">
      <PageHeader className="flex items-center justify-between">
        <PageTitle>Список отделений</PageTitle>
        <OrganizationNewDialog />
      </PageHeader>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Название отделения</TableHead>
            <TableHead>Адрес</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((e, i) => (
            <TableRow key={i}>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.address}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button className="h-8 bg-blue-600" asChild>
                  <Link href={`/orgs/${e.id}/services`}>Услуги</Link>
                </Button>
                <Button className="h-8 bg-blue-600" asChild>
                  <Link href={`/orgs/${e.id}/windows`}>Окна</Link>
                </Button>
                <div className="w-32"></div>
                <Button size="icon" className="bg-blue-600">
                  <Pencil size={16} />
                </Button>
                <RemoveConfirmation id={e.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
