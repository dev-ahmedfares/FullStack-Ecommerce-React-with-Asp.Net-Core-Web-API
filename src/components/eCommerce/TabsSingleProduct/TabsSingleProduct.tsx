import {
  Button,
  CloseButton,
  Container,
  Form,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customTypes/index";
import StaticStarsRating from "../StaticStarsRating/StaticStarsRating";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import StarsRating from "../StarsRating/StarsRating";
import Input from "@components/forms/Input/Input";
import { reviewSchema, TReviewType } from "@validation/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAddReview, actDelReview } from "@store/Review/reviewSlice";
import UserSvg from "@assets/svg/user.svg?react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { tabsParent, tab, imageUser, btnClose } = styles;

type TTabsProps = TProduct & {
  email?: string;
  userId?: number;
  userName?: string;
  loadingReview: string;
  errorReview: string | null;
  reviews: {
    comment: string;
    date: string;
    rating: number;
    userName: string;
  }[];

};

export default function TabsSingleProduct({
  productColors,
  productMaterials,
  productName,
  productId,
  loadingReview,
  // staticElement
  // errorReview,

  reviews,
}: TTabsProps) {
  const [isDeletingReview, setIsDeletingReview] = useState(false);
  const [ refreshReview, setRefreshReview] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TReviewType>({
    resolver: zodResolver(reviewSchema),
  });
  const {accessToken,user} =useAppSelector(state=> state.auth)
  const navigate =useNavigate()
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<TReviewType> = async (data) => {
    if (!accessToken) {
      return ()=> navigate("/login?message=login_required")
    }
    const reviewInfo = {
      comment: data.review,
      rating: data.rating,
      productId,
    };
    await dispatch(actAddReview(reviewInfo))
      .unwrap()
      .then(() => toast.success("Review successfully Added"))
      .catch((err) => toast.error(err)).finally(()=> setRefreshReview(curr=> !curr));
    reset();
    
  };

  // Delete Review
  const handleDeleteReview = async (productId: number) => {
    setIsDeletingReview(true);
    await dispatch(actDelReview(productId))
      .unwrap()
      .then(() => {
        setIsDeletingReview(false)
        toast.success("Review Deleted")
      })
      .catch((err) => {
        setIsDeletingReview(false);
        toast.error(err);
      });
    
  };

  function transformDatetime(reviewDate: string) {
    const date = new Date(reviewDate);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the date and time
    return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className={tabsParent}>
      <Container fluid={"md"}>
        <Tabs
          defaultActiveKey="additionalInformation"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="additionalInformation"
            title="Additional information"
            className={tab}
          >
            <div>
              <span>Color:</span>
              <span className="text-capitalize">
                {" "}
                {productColors?.map((color) => color.colorName).join(", ")}
              </span>
            </div>
            <div>
              <span>Material:</span>
              <span className="text-capitalize">
                {" "}
                {productMaterials
                  ?.map((material) => material.materialName)
                  .join(", ")}
              </span>
            </div>
          </Tab>
          <Tab eventKey="review" title="Review" className={tab}>
            <div>
              <h4 className={`${reviews.length === 0 ? "mb-4" : ""}`}>
                {reviews.length ? reviews.length : "There's no"} review for{" "}
                {productName}
              </h4>
              {reviews.length ? (
                <ul
                  className={`${reviews.length >= 3 ? "overflow-y-auto" : ""}`}
                >
                  {reviews.map((review, idx) => (
                    <li key={`${review.date} ${idx}`}>
                      <div>
                        <span className={imageUser}>
                          <UserSvg />
                        </span>
                        <div>
                          <StaticStarsRating size={17} rating={review.rating} />
                          <p>
                            <span>{review.userName}</span> -{" "}
                            <span>{transformDatetime(review.date)}</span>
                          </p>
                          <p>{review.comment}</p>
                        </div>
                        {user?.userName === review.userName && (
                          <span className={btnClose}>
                            {isDeletingReview ? (
                              <Spinner size="sm" animation="border" />
                            ) : (
                              <CloseButton
                                onClick={() => handleDeleteReview(productId)}
                              />
                            )}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div>
                <span>Add a review</span>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Controller
                      name="rating"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <StarsRating
                          refreshReview={refreshReview}
                          size={22}
                          onSetRating={field.onChange}
                        />
                      )}
                    />
                    <Form.Text muted>
                      {errors.rating?.message && (
                        <span className="text-danger">( Required )</span>
                      )}
                    </Form.Text>
                  </div>

                  <Input
                    label="Your review"
                    name="review"
                    register={register}
                    error={errors.review?.message}
                    as="textarea"
                  />

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loadingReview === "pending" || isDeletingReview}
                  >
                    {loadingReview === "pending" ? (
                      <>
                        <Spinner animation="border" size="sm" /> Loading...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Form>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}
