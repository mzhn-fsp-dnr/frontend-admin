"use client";

import { all, Category } from "@/api/services";
import { PageHeader, PageTitle } from "@/app/(dashboard)/components/ui";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";

function TableContent({
  category,
  indent = false,
}: {
  category: Category;
  indent?: boolean;
}) {
  return (
    <>
      <TableRow>
        <TableCell className={cn(indent && "pl-8")}>{category.name}</TableCell>
        <TableCell className="space-x-2 text-right">
          <Button size="icon" className="bg-blue-600">
            <Pencil size={16} />
          </Button>
          <Button size="icon" className="bg-red-400">
            <Trash2 size={16} />
          </Button>
        </TableCell>
      </TableRow>
      {category.children.map((c, i) => (
        <TableContent category={c} key={i} indent />
      ))}
    </>
  );
}

export default function Page() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["services"],
    queryFn: all,
  });

  if (isError) return <>error</>;
  if (isLoading) return <>loading</>;

  return (
    <section className="flex w-full flex-col gap-8 px-8 py-4">
      <PageHeader className="flex items-center justify-between">
        <PageTitle>Список услуг</PageTitle>
        <Button className="bg-blue-600">Добавить</Button>
      </PageHeader>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Название услуги</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((e, i) => <TableContent category={e} key={i} />)}
        </TableBody>
      </Table>
    </section>
  );
}
