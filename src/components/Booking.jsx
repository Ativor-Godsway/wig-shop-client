import { useForm } from "react-hook-form";

const Booking = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (e, data) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="bg-transparent min-h-screen pt-32 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[95vw]  md:w-[50vw] mx-auto mt-10 p-6 bg-white/20 backdrop-blur-md border-b border-white/30 rounded-xl shadow-lg m-auto"
      >
        <h2 className="mt-2  text-2xl font-serif text-center font-extralight text-white mb-4">
          Book an Appointment
        </h2>
        {/* Name */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-white">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            {...register("name", { required: "Enter your name" })}
          />
          {errors.name && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Contact */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-white">Contact</span>
          </label>
          <input
            type="tel"
            placeholder="Enter contact"
            {...register("contact", {
              required: "Contact is required",
            })}
            className="input input-bordered w-full"
          />
          {errors.contact && (
            <p className="text-error text-sm">{errors.contact.message}</p>
          )}
        </div>

        {/* Service */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-white">Service:</span>
          </label>
          <select
            {...register("service", {
              required: "Which service would you like to book.",
            })}
            className="select  w-full"
          >
            <option value="">-- Select Service --</option>
            <option value="East Legon Outlet">
              Frontal Installation & Styling
            </option>

            <option value="Kumasi"> Closure/Frontal Wig Making</option>
            <option value="Kumasi">Ponytails/Sew-ins</option>
            <option value="Kumasi">Bridal Hairstyling / Makeup</option>
          </select>
          {errors.pickupLocation && (
            <p className="text-error text-sm">
              {errors.pickupLocation.message}
            </p>
          )}
        </div>

        {/* Time */}
        <div className=" mb-4">
          <label className="label text-white">Preferred Time and Date:</label>
          <div className="flex gap-2 w-full">
            <input type="date" className="input" />
            <input type="time" className="input" />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn bg-black text-white hover:bg-[#313131] w-full"
        >
          Book Service
        </button>
      </form>
    </div>
  );
};

export default Booking;
