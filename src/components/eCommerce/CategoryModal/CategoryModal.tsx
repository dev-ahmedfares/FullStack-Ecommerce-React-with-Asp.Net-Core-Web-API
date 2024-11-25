import Input from "@components/forms/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, CloseButton, Form, Modal, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import {
  addNewCategorySchema,
  TAddNewCategory,
} from "@validation/addNewCategorySchema";
import { TLoading } from "@customTypes/index";
import { useAppDispatch } from "@store/hooks";
import {
  actAddNewCategory,
  actDelCategoryById,
} from "@store/Category/categorySlice";
import toast from "react-hot-toast";
import { useState } from "react";

const { form, categoryContainer } = styles;

type TCategoryProps = {
  setShowCategoryModal: (value: boolean) => void;
  showCategoryModal: boolean;
  categories: {
    categoryId: number;
    categoryName: string;
    categoryDescription: string;
  }[];
  loading: TLoading;
  error: string | null;
  setRefreshCategory: (value: boolean) => void;
  loadingAddingProduct:TLoading
};

export default function CategoryModal({
  showCategoryModal,
  setShowCategoryModal,
  categories,
  // willImplemented
  // error,
  loading,
  loadingAddingProduct,
  setRefreshCategory,
}: TCategoryProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<TAddNewCategory>({
    resolver: zodResolver(addNewCategorySchema),
  });

  // i will check for every category to display loading spinner or not by id of category
  const [loadingDeleting, setLoadingDeleting] = useState<number | null>(null);

  //   Add Category
  const handleAddCategories: SubmitHandler<TAddNewCategory> = async (data) => {
    await dispatch(actAddNewCategory(data))
      .unwrap()
      .then(() => toast.success("Category successfully added"));
    setRefreshCategory(true);
    setShowCategoryModal(false);
    reset();
  };

  //   Delete Category
  const handleDeleteCategory = async (id: number) => {
    // At least Three Category to be able to delete category
    if (categories.length === 2) return;
    setLoadingDeleting(id);
    await dispatch(actDelCategoryById(id))
      .unwrap()
      .then(() => toast.success("Category successfully deleted"))
      .finally(() => setLoadingDeleting(null));
    setRefreshCategory(true);
  };

  return (
    <Modal
      show={showCategoryModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onShow={() => setRefreshCategory(false)}
      onHide={() => {
        reset();
        setShowCategoryModal(false);
      }}
    >
      <Modal.Header closeButton className="border-0" />
      <Modal.Body className="pt-0">
        <Form className={form} onSubmit={handleSubmit(handleAddCategories)}>
          <div className={categoryContainer}>
            <h2>All Categories</h2>
            <section>
              {categories.map((category, idx) => {
                let count = idx + 1;
                return (
                  <section key={category.categoryId}>
                    <h2>
                      Category [{count++}]{" "}
                      {categories.length >= 3 ? (
                        <span>
                          {loadingDeleting ===  category.categoryId ? (
                            <Spinner size="sm" />
                          ) : (
                            <CloseButton
                              onClick={() =>
                                handleDeleteCategory(category.categoryId)
                              }
                            />
                          )}
                        </span>
                      ) : null}
                    </h2>
                    <span>
                      <h5>Name:</h5>
                      <p>{category.categoryName}</p>
                    </span>
                    <span>
                      <h5>Description:</h5>
                      <p>{category.categoryDescription}</p>
                    </span>
                  </section>
                );
              })}
            </section>
          </div>
          <h2>Add Category</h2>
          <Input
            label="Name"
            register={register}
            name="categoryName"
            error={errors.categoryName?.message}
          />
          <Input
            as="textarea"
            label="Description"
            register={register}
            name="categoryDescription"
            error={errors.categoryDescription?.message}
          />

          <div className="d-flex gap-2 justify-content-end">
            <Button
              disabled={loading === "pending"}
              variant="secondary"
              onClick={() => {
                setShowCategoryModal(false);
                reset();
              }}
            >
              Close
            </Button>

            <Button
              type="submit"
              disabled={loadingAddingProduct === "pending" || loading === "pending" || loadingDeleting !== null}
            >
              {loadingAddingProduct === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Adding...
                </>
              ) : (
                "Add Category"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
