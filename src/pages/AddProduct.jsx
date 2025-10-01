import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddProductMutation } from "../redux/productsApi";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("length", data.length || "");
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("image1", data.image1[0]);
      formData.append("image2", data.image2[0]);
      formData.append("image3", data.image3[0]);

      await addProduct(formData).unwrap();
      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Error Adding Product");
    }
  };

  return (
    <div className=" w-full">
      <button onClick={() => navigate(-1)} className="btn btn-ghost btn-circle">
        <IoChevronBack size={30} />
      </button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[95vw]  md:w-[50vw] mx-auto mt-5 p-2 bg-[#fdfdfd] rounded-xl shadow-lg m-auto"
      >
        {/* Name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="input w-full"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Descripiton */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            className="input w-full"
            {...register("description", {
              required: "Product description is required",
            })}
          />
          {errors.description && (
            <p className="text-error text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Lenght */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Available lenght</span>
          </label>
          <input
            type="text"
            placeholder="8'/9'/10'"
            {...register("length")}
            className="input input-bordered w-full"
          />
          {errors.length && (
            <p className="text-error text-sm">{errors.length.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Price ($)</span>
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="Enter product price"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be greater than 0" },
            })}
            className="input input-bordered w-full"
          />
          {errors.price && (
            <p className="text-error text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select  w-full"
          >
            {" "}
            <option value="">-- Select Category --</option>
            <option value="Raw Donor">Raw Donor</option>
            <option value="Blend Hair">Blend Hair</option>
            <option value="Sew In">Sew In</option>
          </select>
          {errors.category && (
            <p className="text-error text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Image1 */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Main Product Image</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image1", { required: "Image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-error text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Image2 */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Product Image(2)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image2")}
            className="file-input file-input-bordered w-full"
          />
          {errors.image2 && (
            <p className="text-error text-sm">{errors.image2.message}</p>
          )}
        </div>

        {/* Image3 */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Product Image(3)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image3")}
            className="file-input file-input-bordered w-full"
          />
          {errors.image3 && (
            <p className="text-error text-sm">{errors.image3.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-black text-white hover:bg-[#313131] w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
