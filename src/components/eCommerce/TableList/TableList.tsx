import {
  Button,
  Form,
  Modal,
  Pagination,
  Spinner,
  Table,
} from "react-bootstrap";
import styles from "./styles.module.css";
import { useCallback, useEffect, useState } from "react";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import {
  addProductSchema,
  type TAddProductForm,
} from "@validation/addProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@components/forms/Input/Input";
import useGetProducts from "@hooks/useGetProducts";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import { TProduct } from "@customTypes/index";
import useGetCategories from "@hooks/useGetCategories";
import { useAppDispatch } from "@store/hooks";
import {
  actAddProduct,
  actDelProductById,
  actUpdateProductById,
} from "@store/Product/productSlice";
import SelectedBtns from "../SelectedBtns/SelectedBtns";
import CategoryModal from "../CategoryModal/CategoryModal";
import { ArrayOfColors, ArrayOfMaterials } from "@data/data";
import toast from "react-hot-toast";


const { tableParent, productImg, btn, form, pagination, select } = styles;
export default function TableList() {
  const dispatch = useAppDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [sortPrice, setSortPrice] = useState<string | null>(null);
  const [colorsId, setColorsId] = useState<number[]>([1]);
  const [materialsId, setMaterialsId] = useState<number[]>([1]);
  const [colorsError, setColorsError] = useState("");
  const [materialsError, setMaterialsError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [imageCount, setImageCount] = useState(0);
  const [showModalForDelete, setShowModalForDelete] = useState(false);
  const [currentProductForDelete, setCurrentProductForDelete] = useState(0);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [isEditSession, setIsEditSession] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [refreshCategory, setRefreshCategory] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const pageSize = 6;

  const {
    loading: loadingForProduct,
    // staticElement
    // error: productError,
    productsFullInfo,
    isTheLastPage,
  } = useGetProducts({
    pageNumber: currentPage,
    pageSize,
    refresh,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAddProductForm>({
    resolver: zodResolver(addProductSchema),
  });

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortPrice(e.target.value);
  };

  let allProducts = productsFullInfo;
  if (sortPrice) {
    if (sortPrice === "lowToHigh") {
      allProducts = productsFullInfo.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "highToLow") {
      allProducts = productsFullInfo.sort((a, b) => b.price - a.price);
    }
  }

  const {
    allCategories,
    loading,
    error: errorCategories,
    loadingAddingProduct
  } = useGetCategories(refreshCategory);

  const categoryArr = allCategories.map((category) => {
    return (
      <option key={category.categoryId} value={category.categoryId}>
        {category.categoryName}
      </option>
    );
  });

  // Delete Product Handler
  const handleDeleteProduct = async (id: number) => {
    await dispatch(actDelProductById(id)).unwrap().then(()=> toast.success("Product deleted successfully"));
    setShowModalForDelete(false);
  };

  const handleIncreaseImage = () => {
    if (imageCount <= 3) setImageCount((curr) => ++curr);
  };
  const handleDecreaseImage = () => {
    if (imageCount >= 1) setImageCount((curr) => --curr);
  };

  const handleResetField = () => {
    setModalShow(false);
    setColorsError("");
    setMaterialsError("");
    setColorsId([1]);
    setMaterialsId([1]);
    setImageCount(0);
    reset({
      ProductName: "",
      Price: 0,
      ProductDescription: "",
      StockQuantity: 0,
      CategoryId: allCategories[0].categoryId,
      primaryImage: [],
    });
    setIsEditSession(false);
  };

  // Handel Edit Product

  const handleEditProduct = (product: TProduct) => {
    reset({
      ProductName: product.productName,
      Price: product.price,
      ProductDescription: product.productDescription,
      StockQuantity: product.stockQuantity,
      CategoryId: product.categoryId,
    });
    const colorsArray = product.productColors.map((color) => color.colorId);
    const materialsArray = product.productMaterials.map(
      (material) => material.materialId
    );
    setColorsId(colorsArray);
    setMaterialsId(materialsArray);
    setIsEditSession(true);
    setModalShow(true);
  };

  // For Selected Buttons Colors & Materials
  const checkIsEmpty = useCallback(() => {
    if (!colorsId.length && !materialsId.length) {
      setColorsError("Please, select at least one color.");
      setMaterialsError("Please, select at least one material.");
      return;
    } else if (!colorsId.length) {
      setColorsError("Please, select at least one color.");
      setMaterialsError("");
      return;
    } else if (!materialsId.length) {
      setMaterialsError("Please, select at least one material.");
      setColorsError("");
      return;
    } else {
      setColorsError("");
      setMaterialsError("");
    }
  }, [colorsId, materialsId]);

  useEffect(() => {
    checkIsEmpty();
  }, [checkIsEmpty]);

  // Handel Add Product
  const handleAddProduct: SubmitHandler<TAddProductForm> = async (data) => {
    if (!colorsId.length || !materialsId.length) return;
   
    const formData = new FormData();

    // if (data.primaryImage && typeof data.primaryImage !== "string") {
    // }
    formData.append("Images", data.primaryImage[0]);

    if (data.Image_2) formData.append("Images", data.Image_2[0]);
    if (data.Image_3) formData.append("Images", data.Image_3[0]);
    if (data.Image_4) formData.append("Images", data.Image_4[0]);


    formData.append("CategoryId", String(data.CategoryId));

    
    formData.append("Price", String(data.Price));
    formData.append("ProductDescription", data.ProductDescription);
    formData.append("ProductName", data.ProductName);
    formData.append("StockQuantity", String(data.StockQuantity));

    if (isEditSession) {
      formData.append("ProductId", String(currentProductId));
      formData.append("ProductImages", String(""));
      formData.append("Active", String(true));
      colorsId.map((colorId) =>
        formData.append("ProductColors", String(colorId))
      );
      materialsId.map((materialId) =>
        formData.append("ProductMaterials", String(materialId))
      );
      await dispatch(actUpdateProductById(formData)).unwrap().then(()=> toast.success("Product successfully updated"));;
    } else {
      colorsId.map((colorId) => formData.append("ColorIds", String(colorId)));
      materialsId.map((materialId) =>
        formData.append("MaterialsId", String(materialId))
      );
      await dispatch(actAddProduct(formData)).unwrap().then(()=> toast.success("Product successfully added"));
    }

    // For Reset After submit
    handleResetField();
    setRefresh((curr) => !curr);
  };

 

  return (
    <>
      <DashboardHeader handleSorting={handleSorting} />
      <div className={tableParent}>
        <Table responsive="lg">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Colors</th>
              <th>Materials</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product: TProduct) => (
              <tr key={product.productId}>
                <td>
                  <div className={productImg}>
                    <img
                      src={product.productImages[0].imagePath}
                      alt={`${product.productName}`}
                    />
                  </div>
                </td>
                <td>
                  <h2>{product.productName}</h2>
                </td>
                <td className="d-none d-md-block">
                  <h3>${product.price.toFixed(2)}</h3>
                </td>
                <td>
                  <h2>{product.category.categoryName}</h2>
                </td>

                <td>
                  <h3>{product.stockQuantity} Piece</h3>
                </td>
                <td>
                  <h2>
                    {product.productColors
                      .map((color) => color.colorName)
                      .join(", ")}
                  </h2>
                </td>
                <td>
                  <h2>
                    {product.productMaterials
                      .map((material) => material.materialName)
                      .join(", ")}
                  </h2>
                </td>
                <td>
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setCurrentProductForDelete(product.productId);
                        setShowModalForDelete(true);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setCurrentProductId(product.productId);
                        handleEditProduct(product);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {isTheLastPage && currentPage === 1 ? null : (
          <div className={pagination}>
            <Pagination>
              <Pagination.Prev
                disabled={+currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                &lt; <span>Previous</span>
              </Pagination.Prev>

              <Pagination.Item active>{currentPage}</Pagination.Item>

              <Pagination.Next
                disabled={isTheLastPage}
                onClick={() => setCurrentPage((prev) => ++prev)}
              >
                <span>Next</span> &gt;
              </Pagination.Next>
            </Pagination>
          </div>
        )}
      </div>
      <div className="d-flex my-3 gap-2 justify-content-end">
        <Button
          variant="secondary"
          className={btn}
          size="lg"
          onClick={() => setShowCategoryModal(true)}
        >
          Manage Category
        </Button>
        <Button
          variant="primary"
          className={btn}
          size="lg"
          onClick={() => {
            setIsEditSession(false);
            setModalShow(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      {/* For Confirm Delete Product */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalForDelete}
        onHide={() => setShowModalForDelete(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            DELETING PRODUCT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to Delete this product.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => setShowModalForDelete(false)}
            variant="secondary"
          >
            Close
          </Button>
          <Button
            onClick={() => handleDeleteProduct(currentProductForDelete)}
            disabled={loadingForProduct === "pending"}
          >
            {loadingForProduct === "pending" ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Deleting...
              </>
            ) : (
              "Delete Product"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* For Add Products */}
      <Modal
        show={modalShow}
        onHide={() => {
          handleResetField();
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="border-0" />
        <Modal.Body className="pt-0">
          <Form className={form} onSubmit={handleSubmit(handleAddProduct)}>
            <Input
              label="Product Name"
              register={register}
              name="ProductName"
              error={errors.ProductName?.message}
            />

            <Input
              label="Price"
              register={register}
              name="Price"
              type="number"
              error={errors.Price?.message}
            />
            <Input
              as="textarea"
              label="Description"
              register={register}
              name="ProductDescription"
              type="text"
              error={errors.ProductDescription?.message}
            />

            <div className={select}>
              <h2>Category</h2>
              <Form.Select {...register("CategoryId")}>
                {categoryArr}
              </Form.Select>
            </div>

            <Input
              label="Stock Quantity"
              register={register}
              name="StockQuantity"
              type="number"
              error={errors.StockQuantity?.message}
            />

            <div>
              <Input
                label="Primary Image"
                register={register}
                name="primaryImage"
                type="file"
                error={errors.primaryImage?.message}
              />
              {Array(imageCount)
                .fill(0)
                .map((_, idx) => {
                  const count = ++idx + 1;
                  const name = `Image_${count}` as Path<TAddProductForm> ;
                  return (
                    <Input
                      key={count}
                      label={`Image ${count}`}
                      register={register}
                      name={name}
                      type="file"
                    />
                  );
                })}
              <p className="d-flex gap-2 justify-content-end">
                <Button
                  disabled={+imageCount === 0}
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleDecreaseImage}
                >
                  Decrease Image
                </Button>
                <Button
                  disabled={+imageCount === 3}
                  type="button"
                  size="sm"
                  onClick={handleIncreaseImage}
                >
                  Increase Image
                </Button>
              </p>
            </div>

            <SelectedBtns
              listOfItems={ArrayOfColors}
              itemsId={colorsId}
              label="Colors"
              setItemsId={setColorsId}
              error={colorsError}
            />

            <SelectedBtns
              listOfItems={ArrayOfMaterials}
              itemsId={materialsId}
              label="Materials"
              setItemsId={setMaterialsId}
              error={materialsError}
            />

            <div className="d-flex gap-2 justify-content-end">
              <Button
                disabled={loadingForProduct === "pending"}
                variant="secondary"
                onClick={handleResetField}
                className={btn}
              >
                Close
              </Button>
              {isEditSession ? (
                <Button
                  type="submit"
                  className={btn}
                  onClick={checkIsEmpty}
                  disabled={loadingForProduct === "pending"}
                >
                  {loadingForProduct === "pending" ? (
                    <>
                      <Spinner animation="border" size="sm" /> Editing...
                    </>
                  ) : (
                    "Edit Product"
                  )}
                </Button>
              ) : (
                <Button
                  type="submit"
                  className={btn}
                  onClick={checkIsEmpty}
                  disabled={loadingForProduct === "pending"}
                >
                  {loadingForProduct === "pending" ? (
                    <>
                      <Spinner animation="border" size="sm" /> Adding...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal For Category */}
      <CategoryModal
      loadingAddingProduct={loadingAddingProduct}
        showCategoryModal={showCategoryModal}
        setShowCategoryModal={setShowCategoryModal}
        categories={allCategories}
        loading={loading}
        error={errorCategories}
        setRefreshCategory={setRefreshCategory}
      />
    </>
  );
}
