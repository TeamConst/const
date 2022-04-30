import {
    Button,
    Typography,
    Grid,
    Box,
    TextField,
    Container,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchNowNFT } from "../../../../hooks";
import { useQuery } from "react-query";
import React, { useState, useEffect } from "react";

import Posts from "./ac";
import Pagination from "./ab";

function AllNft() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);



  const { data, isLoading, isFetching } = useQuery(["getNowNFT"], () =>
  fetchNowNFT()
);

let a = 0;
let nftNowData = [];
console.log(data);

if (data) {
  if (data.data.length > 0) {
      a = 1;
      for (let i = 0; i < data.data.length; i++) {
          nftNowData[i] = data.data[i];
          nftNowData[
              i
          ].s3 = `https://const123.s3.ap-northeast-2.amazonaws.com/image/${data.data[i].CID}.jpg`;
      }
  }
}
console.log(nftNowData)
useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setPosts(nftNowData);
      setLoading(false);
    }
    fetchData();
  }, []);
  /* 새로 추가한 부분 */
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

    const theme = createTheme();
  return (
    <div>
    
    <ThemeProvider theme={theme}>


    <Container maxWidth="lg" sx={{ py: 15 }}>

   
  
                                
 
                      
    <Grid item xs={12}>    <Posts nftNowData={currentPosts(nftNowData)} loading={loading}></Posts></Grid>
      
      
      
           
    <Pagination postsPerPage={postsPerPage} totalPosts={nftNowData.length} paginate={setCurrentPage}></Pagination>
    </Container>
  
    </ThemeProvider>
 
</div>
  );
}

export default AllNft;