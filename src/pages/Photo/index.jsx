import { useEffect, useState } from "react";
import CategoryBttn from "../../components/Buttons/CategoryBttn";
import GoToBackArrow from "../../components/GoToBackArrow";
import arrow from "../../images/svg/arrow.svg";

import "./index.css";

const PhotoPage = () => {
  const [active, setActive] = useState("");
  const [closeBttnsList, setCloseBttnsList] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://beautywebapp.ru/api/offers/categories_with_photos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Используется для отправки куков при необходимости
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        console.log(data);
        
      })
      
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  // Разделяем категории с фотографиями для удобного отображения
  const activeCategory = categories.find((cat) => cat.name === active);
  const activePhotos = activeCategory?.photos || [];

  return (
    <div className="photo_page page_bg">
      <GoToBackArrow />
      <div
        className={`category_bttn_list ${
          closeBttnsList ? "hide_category_bttns_list" : ""
        }`}
      >
        <div className="category_bttn_line">
          {categories.slice(0, 3).map((category) => (
            <CategoryBttn
              key={category.name}
              onClick={() => setActive(category.name)}
              active={category.name === active}
            >
              {category.name}
            </CategoryBttn>
          ))}
          <button
            className="hide_bttns_bttn"
            onClick={() => setCloseBttnsList(!closeBttnsList)}
          >
            <img src={arrow} alt="arrow" />
          </button>
        </div>
        <div className="category_bttn_line">
          {categories.slice(3).map((category) => (
            <CategoryBttn
              key={category.name}
              onClick={() => setActive(category.name)}
              active={category.name === active}
            >
              {category.name}
            </CategoryBttn>
          ))}
        </div>
      </div>
      <div className="photo_list">
        <div className="photos_column">
          {activePhotos.slice(0, Math.ceil(activePhotos.length / 2)).map((photo) => (
            <div className="photo" key={photo}>
              <img src={`https://beautywebapp.ru${photo}`} alt="" />
            </div>
          ))}
        </div>
        <div className="photos_column">
          {activePhotos.slice(Math.ceil(activePhotos.length / 2)).map((photo) => (
            <div className="photo" key={photo}>
              <img src={`https://beautywebapp.ru${photo}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoPage;
