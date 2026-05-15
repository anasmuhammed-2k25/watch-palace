import Sidebar from "../../components/sideBar/SideBar";
import AddProductForm from "../../components/form/AddProductForm";

function AddProduct() {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "20px" }}>
        <AddProductForm />
      </div>
    </div>
  );
}

export default AddProduct;