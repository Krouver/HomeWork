import { useState } from "react";
import Slider from "./Slider";
import { ICategoryItem } from "./types";

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([
    {
      id: 1,
      name: "HP Pavilion g6",
      image:
        "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8&w=1000&q=80",
    },
    {
      id: 2,
      name: "Acer Aspire",
      image:
        "https://i.computer-bild.de/imgs/1/3/8/3/6/2/1/9/Microsoft_Surface_Laptop_4_15_Test-6d2b5b775bd62e17.jpg",
    },
    {
      id: 3,
      name: "Lenovo IdeaPad",
      image:
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71-jX3H3-KL._AC_SY450_.jpg",
    },
    {
      id: 4,
      name: "Lenovo ThinkPad",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEWM4u5nPImuD4tQePNxo5ATrBazCGhDT7Pg&usqp=CAU",
    },
    {
      id: 5,
      name: "HP Envy 17",
      image:
        "https://www.hp.com/de-de/shop/Html/Merch/Images/c07951399_1750x1285.jpg",
    },
    {
      id: 6,
      name: "Dell XPS 15 Laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlhuNEJU5XOk-_GhJwJlGf9mwII4CvzmLdgw&usqp=CAU",
    },
    {
      id: 7,
      name: " HUAWEI MateBook D",
      image:
        "https://www.lenovo.com/medias/lenovo-laptops-thinkbook-16-gen-4-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTM2fGltYWdlL3BuZ3xoMjEvaGZkLzEzMjU1MTI1OTkxNDU0LnBuZ3xlMGJjMDAyZjIzYzczYmY0YTY3NTlmODcwMDJjZTBhMzg5M2VlMjFlNTNlZWJkZDMyNDA3MTdlNjc3NjhhZWY5",
    },
    {
      id: 8,
      name: "ASUS Vivobook 16X",
      image:
        "https://www.zdnet.com/a/img/resize/34731cd7f0ec63360f73e299717d48855a628292/2022/12/15/17451b93-3829-43d0-a28f-d32b991f2cc9/dell-xps-13-plus-developer-edition.jpg?auto=webp&fit=crop&height=900&width=1200",
    },
  ]);

  const [cartItems, setCartItems] = useState<number[]>([]); // список товарів у кошику

  const handleAddNewItem = () => {
    const newId = Math.floor(Math.random() * 100) + 1;
    const newItem: ICategoryItem = {
      id: newId,
      name: `Laptop ${newId}`,
      image: "https://via.placeholder.com/300x180",
    };
    setList([...list, newItem]);
  };

  const viewList = list.map((item) => (
    <div
      key={item.id}
      className="card"
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <img src={item.image} alt="#" height="180px" className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  ));

  //////////////////////////////////////////////?
  return (
    <>
      <Slider />
      <h1 className="text-center">Головна сторінка</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {viewList}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <button className="btn btn-primary mt-4" onClick={handleAddNewItem}>
          Add New Item
        </button>
      </div>
    </>
  );
};

export default HomePage;
//test//
