import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import LoadingIndicator from "./LoadingIndicator";

export default function AppLayout() {
  const isLoading = useNavigation().state === "loading";
  return (
    <div className="layout">
      {isLoading && <LoadingIndicator />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
