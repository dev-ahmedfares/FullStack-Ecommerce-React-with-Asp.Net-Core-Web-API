import {
  Accordion,
  Button,
  Form,
  Offcanvas,
  Pagination,
  Row,
} from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import GridList from "@components/shared/GridList/GridList";
import Product from "../Product/Product";
import List from "@assets/svg/lnr-list.svg?react";
import Loading from "@components/feedback/Loading";
import useProductsWithFiltering from "@hooks/useProductsWithFiltering";
import { ArrayOfColors, ArrayOfMaterials } from "@data/data";
import Banner from "../Banner/Banner";

const {
  parent,
  categoryBody,
  canvasContainer,
  sidebar,
  canvasBtn,
  sidebarCanvas,
  pagination,
  offCanvasBody,
  activeBtn,
} = styles;

export default function ShopList() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pageCount = 12;

  // For Filter
  const [priceRange, setPriceRange] = useState(0);

  // Filtering Products
  const {
    allProducts,
    categories,
    loadingCategories,
    errorCategories,
    errorProduct,
    loadingProduct,
    isTheLastPage,
    handleCategoryParams,
    handlePriceParams,
    selectedCategory,
    setSortPrice,
    currentPage,
    setCurrentPage,
    setFilterColor,
    filterColor,
    filterMaterial,
    setFilterMaterial,
  } = useProductsWithFiltering(pageCount);

  // Filter By Price
  const handleRange = () => {
    handleCategoryParams(99999);
    setFilterColor(null);
    setFilterMaterial(null);
    handlePriceParams(`1&Maxprice=${priceRange}`);
  };

  const handleFilterColor = () => {
    handleCategoryParams(99999);
    setFilterMaterial(null);
    setPriceRange(9999999);
  };
  const handleFilterMaterial = () => {
    handleCategoryParams(99999);
    setFilterColor(null);
    setPriceRange(9999999);
  };

  const resetPrice = () => {
    handlePriceParams(`1`);
    setPriceRange(9999999);
  };

  // Filter By Sort Price
  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortPrice(e.target.value);
  };


  return (
    // staticElement Loading here
    
    <div className={parent}>
      <div className={sidebar}>
        <Accordion defaultActiveKey="0" flush alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Categories</Accordion.Header>
            <Accordion.Body>
              <ul>
                {categories.map((item, idx) => (
                  <li key={`${item}-${idx}`}>
                    <button
                      className={`${
                        `CategoryId=${item.categoryId}` === selectedCategory
                          ? activeBtn
                          : ""
                      } `}
                      onClick={() => {
                        resetPrice();
                        setFilterColor(null);
                        setFilterMaterial(null);
                        handleCategoryParams(item.categoryId);
                      }}
                      value={item.categoryId}
                    >
                      {item.categoryName}
                    </button>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Color</Accordion.Header>
            <Accordion.Body>
              <ul>
                {ArrayOfColors.map((item, idx) => (
                  <li key={`${item}-${idx}`}>
                    <button
                      className={`${
                        `colorId=${item.id}` === filterColor ? activeBtn : ""
                      } `}
                      onClick={(e) => {
                        handleFilterColor();
                        setFilterColor(`colorId=${e.currentTarget.value}`);
                      }}
                      value={item.id}
                    >
                      {item.Name}
                    </button>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Materials</Accordion.Header>
            <Accordion.Body>
              <ul>
                {ArrayOfMaterials.map((item, idx) => (
                  <li key={`${item}-${idx}`}>
                    <button
                      className={`${
                        `materialId=${item.id}` === filterMaterial
                          ? activeBtn
                          : ""
                      } `}
                      onClick={(e) => {
                        handleFilterMaterial();
                        setFilterMaterial(
                          `materialId=${e.currentTarget.value}`
                        );
                      }}
                      value={item.id}
                    >
                      {item.Name}
                    </button>
                  </li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div>
          <Form.Label>Price</Form.Label>
          <Form.Range
            onChange={(e) => setPriceRange(+e.target.value)}
            min={0}
            max={allProducts.reduce(
              (acc, el) => (acc >= el.price ? acc : el.price),
              0
            )}
            defaultValue={0}
          />
          <div>
            <div className="d-flex gap-2">
              <Button onClick={resetPrice}>Reset</Button>
              <Button onClick={handleRange}>Apply</Button>
            </div>
            <span>
              {priceRange === 0 || priceRange === 9999999
                ? "$0"
                : `$${priceRange}`}
            </span>
          </div>
        </div>
      </div>
      <div className={categoryBody}>
        <div>
          <Offcanvas
            scroll={false}
            show={show}
            onHide={handleClose}
            className={canvasContainer}
          >
            <Offcanvas.Body className={offCanvasBody}>
              <div className={sidebarCanvas}>
                <Accordion defaultActiveKey="0" flush alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className={canvasBtn}>
                      Categories
                    </Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {categories.map((item, idx) => (
                          <li key={`${item}-${idx}`}>
                            <button
                              className={`${
                                `CategoryId=${item.categoryId}` ===
                                selectedCategory
                                  ? activeBtn
                                  : ""
                              } `}
                              onClick={() => {
                                resetPrice();
                                setFilterColor(null);
                                setFilterMaterial(null);
                                handleCategoryParams(item.categoryId);
                              }}
                              value={item.categoryId}
                            >
                              {item.categoryName}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Color</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {ArrayOfColors.map((item, idx) => (
                          <li key={`${item}-${idx}`}>
                            <button
                              className={`${
                                `colorId=${item.id}` === filterColor
                                  ? activeBtn
                                  : ""
                              } `}
                              onClick={(e) => {
                                handleFilterColor();
                                setFilterColor(
                                  `colorId=${e.currentTarget.value}`
                                );
                              }}
                              value={item.id}
                            >
                              {item.Name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Materials</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {ArrayOfMaterials.map((item, idx) => (
                          <li key={`${item}-${idx}`}>
                            <button
                              className={`${
                                `materialId=${item.id}` === filterMaterial
                                  ? activeBtn
                                  : ""
                              } `}
                              onClick={(e) => {
                                handleFilterMaterial();
                                setFilterMaterial(
                                  `materialId=${e.currentTarget.value}`
                                );
                              }}
                              value={item.id}
                            >
                              {item.Name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <div className="my-4">
                  <Form.Label>Price</Form.Label>
                  <Form.Range
                    onChange={(e) => setPriceRange(+e.target.value)}
                    min={0}
                    max={allProducts.reduce(
                      (acc, el) => (acc >= el.price ? acc : el.price),
                      0
                    )}
                    defaultValue={0}
                  />
                  <div>
                    <div className="d-flex gap-2">
                      <Button onClick={resetPrice}>Reset</Button>
                      <Button onClick={handleRange}>Apply</Button>
                    </div>
                    <span>
                      {priceRange === 0 || priceRange === 9999999
                        ? "$0"
                        : `$${priceRange}`}
                    </span>
                  </div>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

          <div className="d-flex align-items-center gap-3">
            <Button
              variant="secondary"
              onClick={handleShow}
              className="d-block d-lg-none"
            >
              <List />
            </Button>
          </div>
          <Form.Select onChange={handleSorting}>
            <option value={""}>Default sorting</option>
            <option value={"LowToHigh"}>Sort by Price: Low to High</option>
            <option value={"highToLow"}>Sort by Price: High to Low</option>
          </Form.Select>
        </div>
        {/* staticElement */}
        <Loading status={loadingProduct} error={errorProduct} type="product">
          <div className="py-4">
            <Row>
              <GridList
                cols={[{ sm: 6, md: 4, lg: 0, xxl: 3 }]}
                records={allProducts}
                renderItem={(item) => <Product {...item} />}
                message="There are no products"
              />
            </Row>
            {isTheLastPage && currentPage === 1 ? null : (
              <div className={pagination}>
                <Pagination>
                  <div>
                    <span>
                      Page [{currentPage}] showing 1 - {allProducts.length}{" "}
                      results
                    </span>
                  </div>

                  <Pagination.Prev
                    disabled={+currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    &lt;
                    {/* <span>Previous</span> */}
                  </Pagination.Prev>

                  {/* <Pagination.Item active>{currentPage}</Pagination.Item> */}

                  <Pagination.Next
                    disabled={isTheLastPage}
                    onClick={() => setCurrentPage((prev) => ++prev)}
                  >
                    {/* <span>Next</span>  */}
                    &gt;
                  </Pagination.Next>
                </Pagination>
              </div>
            )}
          </div>
        </Loading>
      </div>
    </div>
  );
}
