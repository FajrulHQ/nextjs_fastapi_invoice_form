"use client"
import { Provider } from "react-redux";
import InvoiceForm from "./components/form/invoice";
import { store } from "app/services/store";

export default function Home() {
  return (
    <main className="container py-4">
      <Provider store={store}>
        <InvoiceForm />
      </Provider>
    </main>
  );
}
