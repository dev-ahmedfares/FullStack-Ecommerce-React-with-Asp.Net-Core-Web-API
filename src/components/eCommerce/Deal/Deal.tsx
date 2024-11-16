import { Button } from "react-bootstrap"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom"

const {dealContainer} = styles

export default function Deal({productName,dealTitle,imgUrl}:{productName:string,dealTitle:string,imgUrl:string}) {
    const navigate= useNavigate()
  return (
    <div className={dealContainer}>
        <img src={imgUrl} alt="" />
        <div>
            <h4>Brutal Sale !</h4>
            <span>{dealTitle}</span>
            <h2>{productName}</h2>
            <div>
                <Button variant="primary" onClick={()=>navigate("/products")}>Shop Now</Button>
            </div>
        </div>
    </div>
  )
}
