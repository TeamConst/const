// 여기에 이제 실시간 처리를 해야겠다
// const socketClient = io("http://54.227.126.254:3000");
// socketClient.on("connect", (req) => {
//   console.log(req);
//   console.log("connection server");
// });

// 서버에서 받기
// socketClient.on("refreshAuction", (req) => {
// console.log("성공");
// queryClient.invalidateQueries("getAuctions");
// });
// socketClient.on("first Respond", (req) => {
//   console.log(req);
// });
// socketClient.emit("first Request", { data: "first Reuqest" });

// 경매 처리가 끝나면
// 클라에서 서버로 보내기
// 지금은 주석처리해놈
// socketClient.emit("successAuction", { data: "first Reuqest" });

// const { data2, isLoading2, isFetching2 } = useQuery(["bestCollections"], () =>
//   fetchBestCollections()
// );

// const { isLoading, error, data, isFetching } = useQuery(
//   "repoData",
//   () =>
//     // axios.get('http')
//     fetch("http://54.227.126.254:8080/api/getDate")
//       .then((res) => {
//         console.log(res);
//         return res.json();
//       })
//       .then((json) => {
//         console.log(json);
//       }),
//   { staleTime: 100000 }
// );
