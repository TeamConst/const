// 여기는 익스프레스에서 할 거임

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("hi");
    // sign up 으로 넘겨주면
    // 1. 메타마스크 연결해서 계정 만들고
    // 2. 넘어온 데이터로 DB에 업로드하고(db에는 public key, 아티스트인지 일반고객인지, 국가, 장르)
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
