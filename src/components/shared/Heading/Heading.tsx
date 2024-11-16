const Heading = ({ children ,style="mb-5 mt-4 my-lg-5"}: { style?:string,children: React.ReactNode }) => {
    return (
      <h2 className={style} style={{ fontSize: "24px",fontWeight:"600",textTransform:"uppercase" }}>
        {children}
      </h2>
    );
  };
  
  export default Heading;