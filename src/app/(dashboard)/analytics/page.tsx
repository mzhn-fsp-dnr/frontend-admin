"use client";

import { all, Organization } from "@/api/orgs";
import { DepartmentDays, get_analytics_department_days } from "@/api/query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { PageHeader, PageTitle } from "../components/ui";
import { DaysDiagram } from "../orgs/components/daya-diagram";

export default function Page() {
  const router = useRouter();
  const { isLoading, isError, data } = useQuery({
    queryKey: ["orgs"],
    queryFn: all,
  });
  const [selectedDepartment, setSelectedDepartment] =
    React.useState<Organization | null>();

  const [daysData, setDaysData] = React.useState<DepartmentDays[] | null>(null);

  const refetch = async (e: string) => {
    const data = await get_analytics_department_days(e);
    setDaysData(data);
  };

  const [isOpen, setIsOpen] = React.useState(true);
  const openChange = () => {
    if (!selectedDepartment) return router.back();
    setIsOpen(false);
  };

  if (isError) return <>error</>;
  if (isLoading) return <>loading</>;

  return (
    <section className="flex w-full flex-col gap-8 px-8 py-4">
      <Dialog open={isOpen} onOpenChange={openChange} modal>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <DialogTitle>Выберите отделение</DialogTitle>
            <Select
              onValueChange={(e) => {
                setSelectedDepartment(data!.find((item) => item.id === e));
                setIsOpen(false);
                refetch(e);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Отделение" />
              </SelectTrigger>
              <SelectContent>
                {data?.map(({ id, name }) => (
                  <SelectItem value={id}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <PageHeader className="flex items-center justify-between">
        {selectedDepartment ? (
          <PageTitle>Отделение: {selectedDepartment?.name}</PageTitle>
        ) : (
          ""
        )}
      </PageHeader>
      <div className="grid grid-cols-3">
        {daysData ? <DaysDiagram data={daysData} /> : null}
      </div>
    </section>
  );
}
