import { OrderItem } from "@customTypes/index";
import styles from "./styles.module.css";
const {card} = styles 

export default function Card({img,productName,price}:OrderItem) {
  return (
    <div className={card}>
      <img src={img} />
      <p>
        <span>{productName} <br/> ${price}</span>
      </p>
    </div>
  );
}
