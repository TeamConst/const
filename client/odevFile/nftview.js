{
  c === 1 && d === 1 && e === 1 && g === 1 ? (
    buyData.map((a) => (
      <Grid container spacing={5} textAlign="center">
        <Grid item xs={6}>
          <div>
            <Smart>
              <Dettaglio>
                <Sensore></Sensore>
                <Microfono></Microfono>
              </Dettaglio>
              <AcenzioneButton></AcenzioneButton>
              <VolumeSu></VolumeSu>
              <VolumeGiu></VolumeGiu>
              <Schermo>
                <MusicPlayer
                  str={id2}
                  title={buyDB.title}
                  artist={buyDB.artist}
                />
                <FramePosizione>
                  <Header>
                    <Wrap></Wrap>
                  </Header>
                </FramePosizione>
              </Schermo>
              <Bottone></Bottone>
            </Smart>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Boldtext> {`${buyDB.artist}  -  ${buyDB.title}`}</Boldtext>
            </Grid>
            <Grid item xs={12}>
              <hr />
              <Smalltext>
                <ProfileImg src={userDB.profileImg} />
                {userDB.id2}
              </Smalltext>
            </Grid>
            <Grid item xs={6}>
              <hr />
              👁 {buyDB.view}{" "}
            </Grid>
            <Grid item xs={6}>
              <hr />
              좋아요 {buyDB.LikeMusic}
            </Grid>

            <Grid item xs={12}>
              <hr />
              <Smalltext>Direct purchase price</Smalltext>
              <Boldtext>{`Price:${buyMusicDB.price}eth`} </Boldtext>
              <hr />
            </Grid>

            <Grid item xs={12}>
              {userSessionAll[0].likeMusic === true ? (
                <button onClick={() => upLikeMusic()}>
                  <img src={"/img/heart.png"} width={"30px"}></img>
                </button>
              ) : (
                <button onClick={() => cancelLikeMusic()}>
                  <img src={"/img/fullheart.png"} width={"30px"}></img>
                </button>
              )}
            </Grid>

            <Grid item xs={12}>
              {userSessionAll[0].likeArtist === true ? (
                <button onClick={() => upLikeArtist()}>
                  <img src={"/img/artist.png"} width={"30px"}></img>
                </button>
              ) : (
                <button onClick={() => cancelLikeArtist()}>
                  <img src={"/img/fullartist.png"} width={"30px"}></img>
                </button>
              )}
            </Grid>

            <Grid item xs={12}>
              {userSessionAll[0].bookmarkMusic === true ? (
                <button onClick={() => upBookmarkMusic()}>
                  <img src={"/img/bookmark.png"} width={"30px"}></img>
                </button>
              ) : (
                <button onClick={() => cancelBookmarkMusic()}>
                  <img src={"/img/fullbookmark.png"} width={"30px"}></img>
                </button>
              )}
            </Grid>

            {계정 === userDB.address ? (
              <Grid item xs={12}>
                <hr></hr>
                <Box p={2}>
                  <Typography>본인의 상품입니다</Typography>
                  {/* <Button
                                                type="sumit"
                                                fullWidth
                                                onClick={cancelHandler}
                                                variant="contained"
                                            >
                                                오퍼 취소하기
                                            </Button> */}
                </Box>
                <hr></hr>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <hr></hr>
                <Box p={2}>
                  <Button onClick={buyHandler} fullWidth variant="contained">
                    구매하기
                  </Button>
                </Box>
                <hr></hr>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Box p={2}>디테일 정보</Box>
        </Grid>
        <Grid item xs={4}>
          <Box p={2}>저장 정보</Box>
        </Grid>
        <Grid item xs={4}>
          <Box p={2}>
            <Typography>가격 그래프</Typography>

            {/* <div>
              {f === 1 ? (
                <div>
                  <Box sx={{ m: 2 }}>
                    나와바
                    <ResponsiveLine
                      data={aq}
                      margin={{
                        top: 50,
                        right: 160,
                        bottom: 50,
                        left: 60,
                      }}
                      xScale={{ type: "linear" }}
                      yScale={{
                        type: "linear",
                        stacked: true,
                        min: 0,
                        max: 2500,
                      }}
                      yFormat=" >-.2f"
                      curve="monotoneX"
                      axisTop={null}
                      axisRight={{
                        tickValues: [0, 500, 1000, 1500, 2000, 2500],
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: ".2s",
                        legend: "",
                        legendOffset: 0,
                      }}
                      axisBottom={{
                        tickValues: [0, 20, 40, 60, 80, 100, 120],
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: ".2f",
                        legend: "price",
                        legendOffset: 36,
                        legendPosition: "middle",
                      }}
                      axisLeft={{
                        tickValues: [0, 500, 1000, 1500, 2000, 2500],
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: ".2s",
                        legend: "volume",
                        legendOffset: -40,
                        legendPosition: "middle",
                      }}
                      enableGridX={false}
                      colors={{ scheme: "category10" }}
                      lineWidth={1}
                      pointSize={4}
                      // pointColor={{ theme: "background" }}
                      pointBorderWidth={1}
                      // pointBorderColor={{ from: "serieColor" }}
                      pointLabelYOffset={-12}
                      useMesh={true}
                      gridXValues={[0, 20, 40, 60, 80, 100, 120]}
                      gridYValues={[0, 500, 1000, 1500, 2000, 2500]}
                      legends={[
                        {
                          anchor: "bottom-right",
                          direction: "column",
                          justify: false,
                          translateX: 140,
                          translateY: 0,
                          itemsSpacing: 2,
                          itemDirection: "left-to-right",
                          itemWidth: 80,
                          itemHeight: 12,
                          itemOpacity: 0.75,
                          symbolSize: 12,
                          symbolShape: "circle",
                          symbolBorderColor: "rgba(0, 0, 0, .5)",
                          effects: [
                            {
                              on: "hover",
                              style: {
                                itemBackground: "rgba(0, 0, 0, .03)",
                                itemOpacity: 1,
                              },
                            },
                          ],
                        },
                      ]}
                    ></ResponsiveLine>
                    다나옴?
                  </Box>
                </div>
              ) : (
                <div>그래프 안대연</div>
              )}
            </div> */}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box p={2}>연관상품</Box>
        </Grid>
      </Grid>
    ))
  ) : (
    <div>
      <CircularProgress />
    </div>
  );
}
