import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useCallback } from "react";

const Abc = () => {
  //   fetch("https://api.github.com/repos/tannerlinsley/react-query");

  //   데이터 패칭 시(데이터 받아올 때)
  const { isLoading, error, data, isFetching } = useQuery("AA", async () => {
    const { data } = await axios.get(
      "https://api.github.com/repos/tannerlinsley/react-query"
    );
    return data;
  });

  //   데이터 뮤테이션(서버로 올릴 때)
  const mutation = useMutation(
    (data) => axios.post("http://localhost:3000/mt", data),
    {
      onSuccess: () => {
        console.log(data);
        setUserId(userId + 1);
      },
    }
  );

  //   이벤트 핸들러
  const handleSubmit = useCallback(
    (data) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <ul>
        <button onClick={() => handleSubmit({ id: "A", name: "B" })}>
          유저 추가
        </button>
      </ul>

      {JSON.stringify(data)}
    </div>
  );
};

export default Abc;
