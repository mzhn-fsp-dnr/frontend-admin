"use client";

import React, { useEffect, useState } from 'react';
import {
  getCurrentTicket,
  callNext,
  cancelCurrent,
  endCurrent,
} from "@/api/operator";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from '@/hooks/use-toast';

const AUTO_CALL_INTERVAL_MS = 30000;

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
    refetchInterval: 60000,
  });
};

export default function OperatorMainPage() {
  const { isLoading, isError, data } = useCurrentTicket();
  const [autoCall, setAutoCall] = useState(false);
  const queryClient = useQueryClient()

  const item_index = data ? data['id'] : null;

  const { toast } = useToast();

  useEffect(() => {
    let timerId = undefined;

    const attemptCallNext = async () => {
      try {
        await callNextUser(ignore);
      } catch (error) {
        console.error('Error calling next:', error);
      }
    };

    if (autoCall && item_index === null) {
      attemptCallNext();
      timerId = setInterval(() => {
        attemptCallNext();
      }, AUTO_CALL_INTERVAL_MS);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [item_index, autoCall])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки данных.</div>;
  }

  const callNextUser = async (ignore = false) => {
    const result = await callNext();

    if (result?.ticket) {
      console.log(result.ticket)
      queryClient.invalidateQueries({ queryKey: ['current_ticket'] })
    } else {
      if (!ignore) {
        console.log('here')
        toast({
          variant: "default",
          description: "Нет клиентов, которых ваше окно может обслужить!",
        });
      }
    }
  };

  const cancelUser = async () => {
    if (item_index) {
      await cancelCurrent(item_index);
      if (autoCall) {
        await callNextUser();
      }
      queryClient.invalidateQueries({ queryKey: ['current_ticket'] })
    }
  };

  const completeUser = async () => {
    if (item_index) {
      await endCurrent(item_index);
      if (autoCall) {
        await callNextUser();
      }
      queryClient.invalidateQueries({ queryKey: ['current_ticket'] })
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
          {
            (data != null) && (
              <>
                Тип записи:{" "}
                {
                  (data?.['date_pre_reg']) ? <>
                    <span className="text-blue-600">{data['date_pre_reg']}</span>
                    <br />
                    <span className="text-blue-600">{data['date_reg']}</span>
                  </> : "Обычная регистрация"
                }
              </>
            )
          }
        </div>
        <div className="flex items-center justify-center mb-6">
          <div>
            <input
              type="checkbox"
              id="autoCall"
              checked={autoCall}
              onChange={(e) => setAutoCall(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="autoCall" className="text-lg">
              Автоматически вызывать следующего посетителя
            </label>
          </div>
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 justify-center">
          <Button
            disabled={item_index != null}
            onClick={() => callNextUser()}
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
