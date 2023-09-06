import { PizzaType } from "../features/menu/MenuItem";
import { ProcessedOrderFormData } from "../features/order/CreateOrder";
import { OrderType } from "../features/order/Order";

const API_URL = "https://react-fast-pizza-api.onrender.com/api";

type GETAllPizzaResponseType = {
  status: string;
  data: PizzaType[];
};

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting menu");

  const { data } = (await res.json()) as GETAllPizzaResponseType;
  return data;
}

type GETOrderResponseType = {
  status: string;
  data: OrderType;
};

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = (await res.json()) as GETOrderResponseType;
  return data;
}

type POSTOrderResponseType = {
  status: string;
  data: OrderType;
};

export async function createOrder(newOrder: ProcessedOrderFormData) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data } = (await res.json()) as POSTOrderResponseType;
    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id: string, updateObj: PizzaType) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
