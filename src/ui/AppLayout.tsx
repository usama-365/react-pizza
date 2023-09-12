import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import LoadingIndicator from "./LoadingIndicator";

export default function AppLayout() {
  const isLoading = useNavigation().state === "loading";
  return (
    <div className="grid-col-2 grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoadingIndicator />}
      <Header />
      <div className="overflow-y-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
