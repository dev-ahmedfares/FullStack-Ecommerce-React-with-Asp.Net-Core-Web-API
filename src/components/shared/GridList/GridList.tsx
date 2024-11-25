import { LottieHandler } from "@components/feedback";
import { Col } from "react-bootstrap";

type GridListProps<T> = {
    records:T[],
    renderItem:(record:T)=> React.ReactNode;
    message?:string;
    cols?:[{sm:number,md:number,lg:number,xxl:number}]

}

export default function GridList<T extends {productId?:number}>({records,cols=[{sm:6,md:4,lg:3,xxl:3}],renderItem,message}:GridListProps<T>) {
    
  return (
    <>{records.length > 0
    ? records.map((item:T) => (
        <Col
          key={item.productId}
          {...cols[0]}
          className="d-flex justify-content-center mb-3 mt-2"
        >
          {renderItem(item)}
        </Col>
      ))
    : <div><LottieHandler type="empty" message={message}/></div>}</>
  )
}
