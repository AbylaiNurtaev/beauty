import { useEffect, useState } from "react";
import CategoryBttn from "../../components/Buttons/CategoryBttn";
import GoToBackArrow from "../../components/GoToBackArrow";

import "./index.css";

const PhotoPage = () => {
  const [active, setActive] = useState(""); // Активная категория
  const [closeBttnsList, setCloseBttnsList] = useState(false); // Скрывать лишние кнопки
  const [categories, setCategories] = useState([]); // Список категорий

  useEffect(() => {
    fetch("https://demo.beautywebapp.ru/api/offers/categories_with_photos", {
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
      <div
        className={`category_bttn_list ${
          closeBttnsList ? "hide_category_bttns_list" : ""
        }`}
      >
        {!closeBttnsList && (
          <div
            className="category_bttn_line"
            style={{ paddingBottom: "10px", marginTop: "10px" }}
          >
            {categories.map((category) => (
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
      <div className="photo_list">
        {activePhotos.map((photo, index) => (
          <div className="photo" key={index}>
            <img src={`https://demo.beautywebapp.ru${photo}`} alt="category" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoPage;