import client from "@/lib/axios";

export interface DepartmentDays {
  day: string;
  visit_count: number;
}

export const convert_day_to_str = (day: number) => {
  switch (day) {
    case 0:
      return "Вс";
    case 1:
      return "Пн";
    case 2:
      return "Вт";
    case 3:
      return "Ср";
    case 4:
      return "Чт";
    case 5:
      return "Пт";
    case 6:
      return "Сб";
  }
};

export async function get_analytics_department_days(department_id: string) {
  const res = (
    await client.get(`/queue/analytics/department/${department_id}/days`)
  ).data;

  return res.map((item: { day: number; visit_count: number }) => ({
    day: convert_day_to_str(item.day),
    visit_count: item.visit_count,
  }));
}
