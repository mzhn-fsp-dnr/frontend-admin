import { create } from "@/api/orgs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import orgCreateForm, { OrgCreateDTO } from "@/lib/forms/orgs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const daysOfWeek = [
  { label: "ПН", value: 1 },
  { label: "ВТ", value: 2 },
  { label: "СР", value: 3 },
  { label: "ЧТ", value: 4 },
  { label: "ПТ", value: 5 },
  { label: "СБ", value: 6 },
  { label: "ВС", value: 0 },
];

export default function OrganizationNewDialog() {
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const form = useForm<OrgCreateDTO>({
    resolver: zodResolver(orgCreateForm),
    defaultValues: {
      name: "",
      address: "",
      week_days: [],
      start_time: "",
      end_time: "",
    },
  });

  // Toggle day selection using the day number
  function toggleDay(dayValue: number) {
    setSelectedDays((prev) =>
      prev.includes(dayValue) ? prev.filter((d) => d !== dayValue) : [...prev, dayValue]
    );
  }

  async function onSubmit(values: OrgCreateDTO) {
    values.week_days = selectedDays; // Add selected day numbers to the form data
    await create(values);
    location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600">Добавить</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление отделения</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название отделения</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Рабочие дни</FormLabel>
              <div className="flex space-x-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day.value}
                    type="button"
                    className={`${
                      selectedDays.includes(day.value) ? "bg-blue-600 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => toggleDay(day.value)}
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="start_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Время начала работы</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Время окончания работы</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Создать</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
