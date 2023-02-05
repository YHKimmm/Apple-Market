import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from './Items.module.css'
import DropDown from "../components/DropDown";
import { useSelector } from "react-redux";

function Items() {
  const sortGlobal = useSelector((state) => state.sort.sort);
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState(sortGlobal.value);
  console.log('sortGlobal', sortGlobal)
  const getItems = () => {

    axios
      .get("/api/post/items", { params: { sort: sort } })
      .then((response) => {
        if (response.data.success) {
          setItems([...response.data.items]);
        } else {
          alert("Failed to get items");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getItems();
  }, [sort]);


  console.log('items', items);
  return (
    <main>
      <section className={styles.container}>
        <div className={styles.sort__container}>
          <DropDown sort={sort} setSort={setSort} />
        </div>
        <div className={styles.items}>
          {items.map((item) => {
            return (
              <div key={item._id} className={styles.item}>
                <Link to={`/items/${item.postNum}`}>
                  {item.image && <img src={`/api/post/image?imagePath=${item.image}`} alt="image" />}
                  <h3>{item.title}</h3>
                  <div className={styles.price__info}>
                    <p>$ {item.price}</p>
                    {item.negotiable && <p className={styles.negotiable}>💡Negotiable</p>}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Items;
