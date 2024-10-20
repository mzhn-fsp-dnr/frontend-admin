"use client";

import { 
  getCurrentTicket, 
  callNext, 
  cancelCurrent, 
  endCurrent,
} from "@/api/operator";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

// @ts-ignore
const findServiceById = (services, serviceId) => {
  for (const service of services) {
    if (service.id === serviceId) {
      return service;
    }
    if (service.children && service.children.length > 0) {
      // @ts-ignore
      const found = findServiceById(service.children, serviceId);
      if (found) return found;
    }
  }
  return null;
};

const useCurrentTicket = () => {
  return useQuery({
    queryKey: ['current_ticket'],
    queryFn: getCurrentTicket,
    refetchInterval: 2500,
  });
};


export default function OperatorMainPage() {
  const { isLoading, isError, data } = useCurrentTicket();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const item_index = data ? data['id'] : null;

  const callNextUser = async () => {
    const result = await callNext();

    if (result.ticket != null) {
    }
  };

  const cancelUser = async () => {
    if (item_index) {
      await cancelCurrent(item_index);
    }
  };

  const completeUser = async () => {
    if (item_index) {
      await endCurrent(item_index);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-20 w-full">
      <div className="w-full">
        <div className="text-2xl sm:text-3xl font-bold pb-4 sm:pb-8 text-center">
          Текущий:{" "}
          <span className="text-blue-600">{(data === null) ? "отсутствует" : data['ticket_code']}</span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold pb-4 sm:pb-8 text-center">
          Операция:{" "}
          <span className="text-blue-600">{(data === null) ? "отсутствует" : data['service_name']}</span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold pb-4 sm:pb-8 text-center">
          Тип записи:{" "}
          {
            (data?.['date_pre_reg']) ? <>
              <span className="text-blue-600">{data['date_pre_reg']}</span>
              <br />
              <span className="text-blue-600">{data['date_reg']}</span>
            </> : "Обычная регистрация"
          }
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 justify-center">
          <Button
            disabled={item_index != null}
            onClick={callNextUser}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded"
          >
            Позвать
          </Button>
          <Button
            disabled={item_index === null}
            onClick={cancelUser}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded"
          >
            Отменить
          </Button>
          <Button
            disabled={item_index === null}
            onClick={completeUser}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded"
          >
            Завершить
          </Button>
        </div>
      </div>
    </div>
  );
}
