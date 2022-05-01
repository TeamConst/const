{
  b === 1 && c !== 1 ? (
    musicTop100.map((a) => (
      <TableRow key={a.title}>
        <TableCell>{a.rank}</TableCell>
        <TableCell>
          <img src={a.s3} width={"100px"}></img>
        </TableCell>

        <TableCell>{a.title}</TableCell>
        <TableCell>{a.LikeMusic}</TableCell>
        <TableCell
          onClick={() => {
            changeMusic(a);
          }}
        >
          재생하기
        </TableCell>
      </TableRow>
    ))
  ) : (
    <h1>아님</h1>
  );
}
