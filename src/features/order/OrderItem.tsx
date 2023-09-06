import { formatCurrency } from "../../utils/helpers";
import { CartItemType } from "../cart/Cart";

type OrderItemPropsType = {
  item: CartItemType;
  isLoadingIngredients: boolean;
  ingredients: string[];
};

export default function OrderItem({
  item,
  isLoadingIngredients,
  ingredients,
}: OrderItemPropsType) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}
