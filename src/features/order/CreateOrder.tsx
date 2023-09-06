import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import { CartItemType } from "../cart/Cart";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart: CartItemType[] = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export default function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* To pass the cart field */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button>Order now</button>
        </div>
      </Form>
    </div>
  );
}

type RawOrderFormData = {
  cart: string;
  customer: string;
  phone: string;
  priority?: string;
  address: string;
};

export type ProcessedOrderFormData = {
  customer: string;
  phone: string;
  address: string;
  cart: CartItemType[];
  priority: boolean;
};

export async function createOrderAction(args: ActionFunctionArgs) {
  // Extract the form data
  const formData = Object.fromEntries(
    await args.request.formData()
  ) as RawOrderFormData;
  // Process the form data
  const processedOrder: ProcessedOrderFormData = {
    ...formData,
    cart: JSON.parse(formData.cart) as CartItemType[],
    priority: formData.priority === "on",
  };
  // Perform the POST request
  const order = await createOrder(processedOrder);
  return redirect(`/order/${order.id}`);
}
