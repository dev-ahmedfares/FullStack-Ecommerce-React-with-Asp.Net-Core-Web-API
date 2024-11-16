import styles from "./styles.module.css";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const { basketContainer, basketQuantity, pumpCartQuantity } = styles;

type THeaderCounterProps = {
  totalQuantity: number;
  path: string;
  svgLogo: React.ReactNode;
};

export default function HeaderCounter({
  totalQuantity,
  path,
  svgLogo,
}: THeaderCounterProps) {
  const navigate = useNavigate();
  const [isAnimated, setAnimated] = useState(false);

  useEffect(() => {
    if (!totalQuantity) return;

    setAnimated(true);
    const debounce = setTimeout(() => {
      setAnimated(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={basketContainer} onClick={() => navigate(`${path}`)}>
      {svgLogo}

      {totalQuantity > 0 ? (
        <p
          className={`${basketQuantity} ${isAnimated ? pumpCartQuantity : ""}`}
        >
          {totalQuantity}
        </p>
      ) : null}
    </div>
  );
}
