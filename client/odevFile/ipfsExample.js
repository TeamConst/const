async function A(req, res) {
  const user = req.user[0];

  // formData로 넘어 온 datas를 받아옴
  const data = JSON.parse(req.body.datas);
  const { name, category, type, content } = data;
  // 넘어온 이미지 파일을 받음
  let imageFile = req.files.image;
  // 파일 원본 이름 추출
  let original_name = imageFile.name.split(".");
  original_name = original_name[0];

  // ipfs.add 를 통해 ipfs 서버에 업로드 한다. path 는 키고 content가 실제 이미지 파일. buffer 나 arraybuffer 로 넘겨야 한다.
  await ipfs.add(
    { path: imageFile.name, content: imageFile.data },
    async (err, ipfsHash) => {
      if (err) {
        console.log("err", err);
        return res.status(501).json({ message: err });
      }

      let imageKey = ipfsHash[0].hash + path.extname(imageFile.name);

      imageFile.hash = ipfsHash[0].hash;

      // 메타데이터 정의
      const metadata = {
        attributes: [
          {
            trait_type: "MINING",
            value: "20",
          },
        ],
        name: "--",
        key: imageKey,
        description: "---",
        image: "https://ipfs.infura.io/ipfs/" + imageFile.hash,
        external_url: S3_URI + "nft-files/" + imageKey,
      };

      const src = Readable.from(JSON.stringify(metadata));
      // 메타데이터를 따로 ipfs에 업로드

      await ipfs.add(
        {
          path: "metadata.json",
          content: src,
        },
        async (err, hash) => {
          if (err) {
            console.log("err", err);
          }

          // 여기선 디비에 업로드 함
        }
      );
    }
  );

  //return res.status(502).json({ message: 'server error'});
}
