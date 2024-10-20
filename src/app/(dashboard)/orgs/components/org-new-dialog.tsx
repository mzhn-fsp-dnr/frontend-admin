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

export default function OrganizationNewDialog() {
  const form = useForm<OrgCreateDTO>({
    resolver: zodResolver(orgCreateForm),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  async function onSubmit(values: OrgCreateDTO) {
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
            <Button type="submit">Создать</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
