import { TLoading } from "@customTypes/index";

import { DashboardSkeleton, WishlistSkeleton,SingleProductPageSkeleton, TableSkeleton,ProductsSkeleton, CartSkeleton, LottieHandler } from "./index";

const skeletonType = {
  product: ProductsSkeleton,
  cart: CartSkeleton,
  table:TableSkeleton,
  singleProduct:SingleProductPageSkeleton,
  wishlistSkeleton:WishlistSkeleton,
  dashboardSkeleton:DashboardSkeleton
};

type LoadingProps = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
  type: keyof typeof skeletonType;
};

export default function Loading({
  status,
  error,
  children,
  type,
}: LoadingProps) {
  const Component = skeletonType[type];

  if (status === "pending") {
    return <Component />;
  } else if (status === "failed") {
    return <LottieHandler type="error" message={error as string}/>;
  } else if (status === "succeeded") {

    return <>{children}</>;
  }

  return null

}
