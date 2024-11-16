import {
  Button,
  Dropdown,
  DropdownButton,
  Pagination,
  Row,
} from "react-bootstrap";
import styles from "./styles.module.css";
import GridList from "@components/shared/GridList/GridList";
import Loading from "@components/feedback/Loading";
import Product from "../Product/Product";
import useProductsWithFiltering from "@hooks/useProductsWithFiltering";

const {
  btn,
  dropdown,
  btnActive,
  menu,
  FilterActive,
  categoryStyle,
  categoryList,
  pagination,
} = styles;

export default function CategorySection() {


  const {
    allProducts,
    categories,
    // staticElement
    // loadingCategories,
    // errorCategories,
    errorProduct,
    loadingProduct,
    isTheLastPage,
    handleCategoryParams,
    handlePriceParams,
    resetSorting,
    selectedCategory,
    setSortPrice,
    sortPrice,
    currentPage,
    searchParams,
    setCurrentPage,
  } = useProductsWithFiltering();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <ul className={categoryList}>
          {categories.map((category) => (
            <li key={category.categoryId}>
              <Button
                variant="link"
                className={`${btn}
                   ${
                     `CategoryId=${category.categoryId}` === selectedCategory
                       ? btnActive
                       : ""
                   }`}
                onClick={() => handleCategoryParams(category.categoryId)}
              >
                {category.categoryName}
              </Button>
            </li>
          ))}
        </ul>
        <div className={categoryStyle}>
          <DropdownButton
            id="dropdown-item-button"
            variant=""
            title="CATEGORY"
            className={dropdown}
            align={"end"}
          >
            <div className={menu}>
              <div>
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category.categoryId}
                    onClick={() => handleCategoryParams(category.categoryId)}
                    as="button"
                    className={` ${
                      `CategoryId=${category.categoryId}` === selectedCategory
                        ? FilterActive
                        : ""
                    }`}
                  >
                    {category.categoryName}
                  </Dropdown.Item>
                ))}
              </div>
            </div>
          </DropdownButton>
        </div>
        <div>
          <DropdownButton
            id="dropdown-item-button"
            variant=""
            title="FILTER"
            className={dropdown}
            align={"end"}
          >
            <div className={menu}>
              <div>
                <Dropdown.ItemText>SORT BY</Dropdown.ItemText>
                <Dropdown.Item as="button" onClick={resetSorting}>
                  Default
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setSortPrice("LowToHigh")}
                  className={`${sortPrice === "LowToHigh" ? FilterActive : ""}`}
                >
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => setSortPrice("highToLow")}
                  className={`${sortPrice === "highToLow" ? FilterActive : ""}`}
                >
                  Price: High to Low
                </Dropdown.Item>
              </div>
              <div>
                <Dropdown.ItemText>PRICE RANGE</Dropdown.ItemText>
                <Dropdown.Item
                  as="button"
                  onClick={() => handlePriceParams(`1&Maxprice=100`)}
                  className={`${
                    searchParams.get("MinPrice") === `1&Maxprice=100`
                      ? FilterActive
                      : ""
                  }`}
                >
                  $0-$100
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handlePriceParams(`100&Maxprice=300`)}
                  className={`${
                    searchParams.get("MinPrice") === `100&Maxprice=300`
                      ? FilterActive
                      : ""
                  }`}
                >
                  $100-$300
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handlePriceParams(`300&Maxprice=500`)}
                  className={`${
                    searchParams.get("MinPrice") === `300&Maxprice=500`
                      ? FilterActive
                      : ""
                  }`}
                >
                  $300-$500
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={() => handlePriceParams(`500&Maxprice=1000`)}
                  className={`${
                    searchParams.get("MinPrice") === `500&Maxprice=1000`
                      ? FilterActive
                      : ""
                  }`}
                >
                  $500-$1000
                </Dropdown.Item>
              </div>
            </div>
          </DropdownButton>
        </div>
      </div>
      <Loading status={loadingProduct} error={errorProduct} type="product">
        <Row>
          {/* Render Props Pattern */}
          <GridList
            message="There are no products"
            records={allProducts}
            renderItem={(record) => <Product {...record} />}
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
      </Loading>
    </>
  );
}
