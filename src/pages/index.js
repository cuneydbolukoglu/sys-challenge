import { Fragment } from "react";
import CustomerData from "./customerData";

export default function Home() {
  return (
    <Fragment>
      <CustomerData />
    </Fragment>
  );
}

Home.pageTitle = "Müşteri Verileri";