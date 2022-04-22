import {
    Button,
    Typography,
    Grid,
    Box,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from "@mui/material";
  import Container from "@mui/material/Container";
  import Card from "@mui/material/Card";
  import CardActions from "@mui/material/CardActions";
  import CardContent from "@mui/material/CardContent";
  import CardMedia from "@mui/material/CardMedia";
  import { createTheme, ThemeProvider } from "@mui/material/styles";
  
  const theme = createTheme();
  
  const getVideo = () => {
  
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Container sx={{ py: 24}} maxWidth="md">
          <Grid item xs={12}>
            <video _ngcontent-tyb-c80="" muted="" loop="" autoplay="" width="100%"   webkit-playsinline="" playsinline="" oncanplay="play()" onloadedmetadata="this.muted = true" src="https://firebasestorage.googleapis.com/v0/b/nikplace-339fc.appspot.com/o/videos%2F17f2403f734-%5B1920x576%5D%E1%84%8B%E1%85%B0%E1%86%B8%E1%84%91%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%8C%E1%85%B5_%E1%84%89%E1%85%A1%E1%86%BC%E1%84%83%E1%85%A1%E1%86%AB%20%E1%84%92%E1%85%A9%E1%86%AF%E1%84%82%E1%85%B5%E1%86%A8.mp4?alt=media&amp;token=7df632b6-4641-4c96-bc45-eb9eeb9a1470" class="ng-star-inserted"></video>
            </Grid>
          </Container>
        </ThemeProvider>
      </div>
    );
  };
  
  export default getVideo;
  