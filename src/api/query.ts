import client from "@/lib/axios";
import { Category, get_service_by_id } from "./services";

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
export interface DepartmentServices {
  service_name: Category;
  percent: number;
}

export async function get_analytics_services(
  department_id: string
): Promise<DepartmentServices[]> {
  const res = (
    await client.get(`/queue/analytics/department/${department_id}/services`)
  ).data;

  return await Promise.all(
    res.map(async (item: { service_id: string; percent: number }) => ({
      service_name: (await get_service_by_id(item.service_id)).name,
      percent: item.percent,
    }))
  );
}

function parseTime(timeString: string) {
  if (!timeString || timeString === "None") return 0;
  // Разбиваем строку по символу ":"
  const parts = timeString.split(":");

  // Получаем часы, минуты, секунды и миллисекунды
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseFloat(parts[2]); // Считываем с миллисекундами

  // Переводим все в секунды
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return totalSeconds;
}

function formatTime(hours: number) {
  // Проверяем, что hours — это число и находится в допустимом диапазоне
  if (typeof hours !== "number" || hours < 0 || hours > 23) {
    throw new Error("Введите число от 0 до 23");
  }

  // Преобразуем часы в строку с ведущим нулем
  const formattedHours = String(hours).padStart(2, "0");
  return `${formattedHours}:00`;
}

export interface DepartmentTime {
  hour: string;
  awg_wait_time: number;
}

export async function get_analytics_times(department_id: string) {
  const res = (
    await client.get(
      `/queue/analytics/department/${department_id}/awg_wait_time`
    )
  ).data;
  console.log("Res data: ");

  return res.map((item: any) => ({
    awg_wait_time: parseTime(item.avg_wait_time) / 60,
    hour: formatTime(item.hour),
  }));
}

export interface DepartmentTotal {
  date: string;
  total_visits: number;
  pre_reg_visits: number;
  in_person_visits: number;
}

export async function get_analytics_total(department_id: string) {
  const res = (
    await client.get(`/queue/analytics/department/${department_id}/total`)
  ).data;
  return res;
}
