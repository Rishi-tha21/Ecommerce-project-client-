import { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import { getSearchResults } from "../../utils/searchUtils";
import dropdown_icon from "../Assets/dropdown_icon.png";
import Item from "../Item/Item";

const ShopCategory = (props) => {
  const { all_product, searchQuery } = useContext(ShopContext);

  const categoryProducts = all_product.filter(
    (item) => item.category === props.category,
  );
  const filteredProducts = searchQuery.trim()
    ? getSearchResults(categoryProducts, searchQuery)
    : categoryProducts;

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-inderSort">
        <p>
          <span>Showing {filteredProducts.length}</span> out of{" "}
          {all_product.filter((p) => p.category === props.category).length}{" "}
          products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
      {filteredProducts.length === 0 && (
        <div className="shopcategory-no-results">
          <p>No products found matching "{searchQuery}"</p>
        </div>
      )}
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
