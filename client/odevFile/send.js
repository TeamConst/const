import { useForm } from "react-hook-form";
import axios from "axios";

const Send = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const file = data.picture[0];

    const formData = new FormData();
    formData.append("picture", file);

    const result = await axios.post("http://localhost:8080/upload", formData);
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("picture")} type="file"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
};

export default Send;
