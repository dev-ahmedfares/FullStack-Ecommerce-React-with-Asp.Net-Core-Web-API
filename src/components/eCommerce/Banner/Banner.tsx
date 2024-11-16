
import styles from "../Banner/styles.module.css";
import Breadcrumb from "../BreadCrumb/Breadcrumb";


const { banner } = styles;

export default function Banner({
  title,
  url,
  className,
  withPath = true,
}: {
  title: string;
  url?: string;
  className?: string;
  withPath?: boolean;
}) {
  
  return (

    <div className={`${banner} ${className}`}>
      {url && <img src={url} />}
      <div>
      <p>{title}</p>
      {withPath &&  (
        <Breadcrumb />
      )}
      </div>
    </div>
  );
}
