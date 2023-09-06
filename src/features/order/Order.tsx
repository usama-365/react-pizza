// Test ID: IIDSAT

import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { CartItemType } from "../cart/Cart";

export type OrderType = {
  id: string;
  customer: string;
  phone: string;
  status?: boolean;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: CartItemType[];
  position: string;
  orderPrice: number;
  priorityPrice: number;
};

export default function Order() {
  const order = useLoaderData() as OrderType;

  const { status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div>
      <div>
        <h2>Status</h2>

        <div>
          {priority && <span>Priority</span>}
          <span>{status} order</span>
        </div>
      </div>

      <div>
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <div>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}

export async function orderLoader(
  args: LoaderFunctionArgs
): Promise<OrderType | undefined> {
  const orderID = args.params.orderId;
  const order = orderID ? await getOrder(orderID) : undefined;
  return order;
}
