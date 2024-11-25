import React from "react";
import { Table } from "react-bootstrap";
import styles from "./styles.module.css";

const { table } = styles;

export default function OrdersTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={table}>
      <Table borderless={true}  >
        <thead>
          <tr>
            <th>Order Number</th>
            <th>items</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </div>
  );
}
