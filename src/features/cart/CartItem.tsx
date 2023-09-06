import { CartItemType } from "./Cart";

type CartItemPropsType = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemPropsType) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li>
      <p>
        {quantity}&times; {name}
      </p>
      <div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}
