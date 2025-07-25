import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/product-card";
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartReducer";
import { CustomError } from "../types/api-types";
import { CartItem } from "../types/types";


const Search = () => {

  const {
    data:categoriesResponse,
    isLoading:loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("")

  const [search,setSearch] = useState("");
  const [sort,setSort] = useState("");
  const [maxPrice,setMaxPrice] = useState(100000);
  const [category,setCategory] = useState("");
  const [page,setPage] = useState(1);

  const dispatch = useDispatch()

  const {
      isLoading:productLoading,
      data:searchedData,
      isError:productIsError,
      error:productError,
    } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price:maxPrice
  })

    const addToCardHandler = (cartItem:CartItem) =>{
    if(cartItem.stock < 1) return toast.error("Out of Stock!")
    dispatch(addToCart(cartItem))
    toast.success("Added to Cart")
  }

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

   if(isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

   if(productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }




//   const categories = Array.isArray(categoriesResponse?.categories) ? categoriesResponse.categories : [];



  return (
      <div className="product-search-page">
      <aside>
        <h2>Filters</h2>

        <div>
          <h4>Sort</h4>
          <select 
           value={sort}
           onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price:{maxPrice || ""}</h4>
          <input 
           type="range"
           min={100}
           max={10000}
           value={maxPrice}
           onChange={(e) => setMaxPrice(Number(e.target.value))}
           />
        </div>

        <div>
          <h4>Category</h4>
            <select 
              value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">ALL</option>

                  {!loadingCategories &&
                    Array.isArray(categoriesResponse?.categories) &&
                    categoriesResponse.categories.length > 0 ? (
                      categoriesResponse.categories.map((i) => (
                        <option key={i} value={i}>
                          {i.toUpperCase()}
                        </option>
                        ))
                      ) : (
                        <option disabled>
                          {loadingCategories ? "Loading categories..." : "No categories available"}
                        </option>
                      )}
              </select>
        </div>
      </aside>

      <main>
        <h1>Products</h1>
        <input type="text" 
        placeholder="Search by Name.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

        {
          productLoading ? <Skeleton length={10} /> : <div className="search-product-list">
          {
            searchedData?.products.map((i) => (
              <ProductCard
              key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCardHandler}
                photo={i.photo}
              />
            ))}
        </div>
        }

        {
          searchedData && searchedData.totalPage > 1 && (
            <article>
          <button 
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}>Prev</button>
          <span>
            {page} of {searchedData.totalPage}
          </span>
          <button
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </article>
          )
        }

      </main>
    </div>
  )
}


export default Search
