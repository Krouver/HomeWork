import { useEffect, useState } from "react";
import Slider from "./Slider";
import { ICategoryItem } from "./types";
import { APP_ENV } from "../../env";
import http from "../../http_common";
import { Link } from "react-router-dom";
import EclipseWidget from "../common/eclipse";
import { Modal, Button } from "react-bootstrap";

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDelete = (itemId: any) => {
    setSelectedItemId(itemId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    const updatedList = list.filter((item) => item.id !== selectedItemId);
    setList(updatedList);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const viewList = list.map((item) => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>
          <img src={`${APP_ENV.BASE_URL}images/150_${item.image}`} alt="Якась фотка" width="75" />
        </td>
        <td>{item.title}</td>
        <td>
          <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
            Видалити
          </button>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    console.log("Working useEffect");
    http.get<ICategoryItem[]>(`api/categories/list`).then((resp) => {
      console.log("Server response", resp.data);
      const { data } = resp;
      setList(data);
    });
  }, []);

  console.log("Render component", APP_ENV);

  return (
    <>
      {/* <EclipseWidget/> */}
      <Slider />
      <h1 className="text-center">Головна сторінка</h1>
      <Link to="/admin/categories/create" className="btn btn-success">
        Додати
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Фото</th>
            <th scope="col">Назва</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{viewList}</tbody>
      </table>

      <Modal show={showModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Підтвердження видалення</Modal.Title>
        </Modal.Header>
        <Modal.Body>Ви впевнені, що хочете видалити цю категорію?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Відміна
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Видалити
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HomePage;