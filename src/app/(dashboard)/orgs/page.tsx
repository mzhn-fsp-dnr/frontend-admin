"use client";

import { all } from "@/api/orgs";
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
import { PageHeader, PageTitle } from "../components/ui";

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
        <Button className="bg-blue-600">Добавить</Button>
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
              <TableCell className="space-x-2 text-right">
                <Button size="icon" className="bg-blue-600">
                  <Pencil size={16} />
                </Button>
                <Button size="icon" className="bg-red-400">
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
