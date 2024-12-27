import { useEffect, useState } from "react";
import CategoryBttn from "../../components/Buttons/CategoryBttn";
import GoToBackArrow from "../../components/GoToBackArrow";
import arrow from "../../images/svg/arrow.svg";

import "./index.css";

const PhotoPage = () => {
  const [active, setActive] = useState(""); // Активная категория
  const [closeBttnsList, setCloseBttnsList] = useState(false); // Скрывать лишние кнопки
  const [categories, setCategories] = useState([]); // Список категорий

  useEffect(() => {
    fetch("https://beautywebapp.ru/api/offers/categories_with_photos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Отправка куков
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);

        // Устанавливаем первую категорию активной по умолчанию
        if (data.length > 0) {
          setActive(data[0].name);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  // Находим активную категорию и её фотографии
  const activeCategory = categories.find((cat) => cat.name === active);
  const activePhotos = activeCategory?.photos || [];

  return (
    <div className="photo_page page_bg">
      <GoToBackArrow />
        <div className="category_bttn_line" style={{ marginTop: "17px" }}>
          {categories.slice(0, 3).map((category) => (
            <CategoryBttn
              key={category.name}
              onClick={() => setActive(category.name)}
              active={category.name === active}
            >
              {category.name}
            </CategoryBttn>
          ))}
        </div>
          <button
            className="hide_bttns_bttn"
            onClick={() => setCloseBttnsList(!closeBttnsList)}
          >
            <img
              src={arrow}
              alt="arrow"
              style={{
                transform: closeBttnsList ? "rotate(90deg)" : "rotate(-90deg)",
              }}
            />
          </button>
      <div
        className={`category_bttn_list ${
          closeBttnsList ? "hide_category_bttns_list" : ""
        }`}
      >
        {!closeBttnsList && (
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
        )}
      </div>
      <div className="photo_list" style={{ marginTop: "17px" }}>
          {activePhotos.slice(0, Math.ceil(activePhotos.length / 2, activePhotos.length)).map((photo) => (
            <div className="photo" key={photo}>
              <img src={`https://beautywebapp.ru${photo}`} alt="" />
            </div>
          ))}
        </div>

        <div className="photo_list">
          {activePhotos.slice(Math.ceil(activePhotos.length / 2, activePhotos.length)).map((photo) => (
            <div className="photo" key={photo}>
              <img src={`https://beautywebapp.ru${photo}`} alt="" />
            </div>
          ))}
          </div>
    </div>
  );
};

export default PhotoPage;
