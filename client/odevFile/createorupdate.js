// 오퍼 처리
server.post("/api/setBuyOffer", async (req, res) => {
    const a = req.body;

    console.log(a);

    // CID로 검색을 해야되니까
    async function updateOrCreate() {
        // First try to find the record
        const foundItem = await BuyMusic.findOne({
            where: { CID: req.body.CID },
        });
        if (!foundItem) {
            // Item not found, create a new one
            await BuyMusic.create({
                sellComplete: false,
                CID: req.body.CID,
                currentOwner: req.body.address,
                price: req.body.price,
            });
        } else {
            console.log("업데이트");
            await BuyMusic.update(
                {
                    sellComplete: false,
                    sellCount: foundItem.sellCount + 1,
                    currentOwner: req.body.address,
                    price: req.body.price,
                },
                { where: { CID: req.body.CID } }
            );
            res.send("setBuyOffer success");
        }
    }
    updateOrCreate();
});
// 오퍼 처리 끝
