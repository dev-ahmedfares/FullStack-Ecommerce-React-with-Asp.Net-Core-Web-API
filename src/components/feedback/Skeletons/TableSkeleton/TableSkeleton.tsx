import {  Table } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import styles from "./styles.module.css";

const { table } = styles;

const TableSkeleton = () => (
  <div className={table}>
    <Table borderless={true}>
      
      <tbody>
        {Array(8)
          .fill(0)
          .map((__, idx) => (
            <tr>
              <ContentLoader
            key={idx}
              className="w-100 "
              speed={2}
              width={1200}
              height={60}
              viewBox="0 0 1200 60"
              backgroundColor="#e8e8e8"
              foregroundColor="#f5f4f4"
              
            >
              <rect x="0" y="22" rx="4" ry="4" width="160" height="20" />
              <rect x="290" y="22" rx="4" ry="4" width="160" height="20" />
              <rect x="820" y="22" rx="4" ry="4" width="120" height="20" />
              
            </ContentLoader>
            </tr>
          ))}
      </tbody>
    </Table>
  </div>
);

export default TableSkeleton;
