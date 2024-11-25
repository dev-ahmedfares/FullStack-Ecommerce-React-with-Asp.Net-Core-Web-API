import { useSearchParams } from "react-router-dom";
import useGetCategories from "./useGetCategories";
import useGetProducts from "./useGetProducts";
import { useState } from "react";

const useProductsWithFiltering = (pageCount: number = 8) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterPrice, setFilterPrice] = useState<string | null>(null);
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [filterMaterial, setFilterMaterial] = useState<string | null>(null);
  const [sortPrice, setSortPrice] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(pageCount);

  // Important notice about filtering in this page this behavior must work together filter category & price but there's an problem with api endpoint that take only one query filter price or category very soon will discuss with backend about this problem to fix it .
  const handleCategoryParams = (categoryId: number) => {
    setCurrentPage(1);

    if (categoryId === 99999) {
      setSelectedCategory("");
      searchParams.delete("CategoryId");
    } else {
      setSelectedCategory(`CategoryId=${categoryId}`);
      searchParams.set("CategoryId", `${categoryId}`);
    }
    
    searchParams.delete("MinPrice");
    setFilterPrice(null);

    setSearchParams(searchParams);
  };

  const handlePriceParams = (prefix: string) => {
    setCurrentPage(1);
    setSelectedCategory("");
    searchParams.delete("CategoryId");
    setFilterPrice(`MinPrice=${prefix}`);

    searchParams.set("MinPrice", prefix);
    setSearchParams(searchParams);
  };

  const resetSorting = () => {
    setFilterPrice(null);
    setSortPrice(null);
    searchParams.delete("MinPrice");
    setSearchParams(searchParams);
  };

  const query = selectedCategory
    ? {
        filterQuery: `${selectedCategory}`,
        pageSize,
        pageNumber: currentPage,
      }
    : filterPrice
    ? { filterQuery: `${filterPrice}`, pageSize, pageNumber: currentPage }
    : filterColor
    ? { filterQuery: `${filterColor}`, pageSize, pageNumber: currentPage }
    : filterMaterial
    ? { filterQuery: `${filterMaterial}`, pageSize, pageNumber: currentPage }
    : { pageSize, pageNumber: currentPage };

  const {
    loading: loadingProduct,
    error: errorProduct,
    productsFullInfo,
    isTheLastPage,
  } = useGetProducts(query);

  
  const {
    allCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useGetCategories();

  const categories = [
    { categoryName: "All", categoryId: 99999 },
    ...allCategories,
  ];

  let allProducts = productsFullInfo;
  if (sortPrice) {
    if (sortPrice === "LowToHigh") {
      allProducts = productsFullInfo.sort((a, b) => a.price - b.price);
    } else if (sortPrice === "highToLow") {
      allProducts = productsFullInfo.sort((a, b) => b.price - a.price);
    }
  }

  return {
    allProducts,
    categories,
    loadingCategories,
    errorCategories,
    selectedCategory,
    errorProduct,
    loadingProduct,
    isTheLastPage,
    handleCategoryParams,
    handlePriceParams,
    resetSorting,
    setSortPrice,
    sortPrice,
    currentPage,
    searchParams,
    setCurrentPage,
    setFilterColor,
    filterColor,
    filterMaterial,
    setFilterMaterial,
  };
};

export default useProductsWithFiltering;
