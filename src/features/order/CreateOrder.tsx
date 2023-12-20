import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { CartItemType } from "../cart/Cart";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
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

type CreateOrderActionErrorType = {
  phone?: string;
};

export default function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const isSubmitting = useNavigation().state === "submitting";
  const formErrors = useActionData() as CreateOrderActionErrorType | undefined;

  return (
    <div>
      <h2>Ready to order!</h2>

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
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" className="input" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* To pass the cart field */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button
            disabled={isSubmitting}
            className="inline-block rounded-lg bg-yellow-400 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Loading..." : "Order now"}
          </button>
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
    await args.request.formData(),
  ) as RawOrderFormData;
  // Process the form data
  const processedOrder: ProcessedOrderFormData = {
    ...formData,
    cart: JSON.parse(formData.cart) as CartItemType[],
    priority: formData.priority === "on",
  };
  // Validation
  const errors: CreateOrderActionErrorType = {};
  if (!isValidPhone(processedOrder.phone))
    errors.phone =
      "Please give us your correct phone. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;
  // Perform the POST request
  const order = await createOrder(processedOrder);
  return redirect(`/order/${order.id}`);
}
