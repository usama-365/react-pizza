import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem, { PizzaType } from "./MenuItem";

export default function Menu() {
  const menu = useLoaderData() as PizzaType[];
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}
