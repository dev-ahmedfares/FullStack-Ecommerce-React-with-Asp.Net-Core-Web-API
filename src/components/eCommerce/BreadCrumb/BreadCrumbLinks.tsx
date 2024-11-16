import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";

const { breadCrumb } = styles;

export default function Breadcrumb({ className, lastName }: { className?: string; lastName?: string }) {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean); 
  
  return (
    <div className={`${breadCrumb} ${className}`}>
      <ul>
        <li>
          <Link to="/" replace>home</Link>
        </li>
        {paths.map((path, idx) => (
          
          <li key={`${idx}-${path}`}>
            {idx === paths.length - 1 ? (
              <span>{lastName || path}</span>
            ) : (
              
              <Link to={`/${path}`} replace>{path}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
