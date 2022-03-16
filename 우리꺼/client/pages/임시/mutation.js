import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useCallback } from "react";

const Mt = () => {
  const { isLoading, error, data, isFetching } = useQuery("AA", async () => {
    const { data } = await axios.get(
      "https://api.github.com/repos/tannerlinsley/react-query"
    );
    return data;
  });

  const queryClient = useQueryClient();

  const mutation = useMutation((newTodo) => axios.post("/AAA", newTodo), {
    onSuccess: () => {
      queryClient.invalidateQueries("AA");
    },
  });

  return (
    <div>
      {mutation.isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
};

export default Mt;
