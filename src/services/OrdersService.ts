import { IOrders } from "@/entities/IOrder";
import { httpClient } from "./httpClient";

export const getOrdersService = async () => {
  const { data } = await httpClient.get<IOrders>("/orders");

  return data;
};
