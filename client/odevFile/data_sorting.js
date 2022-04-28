{
    !a.BuyMusic_CID || !a.AuctionMusic_CID ? (
        <Button onClick={() => handleOpen(a)}>판매 & 경매 시작하기</Button>
    ) : (
        <div>
            {a.BuyMusic_CID[0].sellComplete === false ||
            a.AuctionMusic_CID[0].auctionComplete === false ? (
                <Button onClick={() => handleOpen(a)}>
                    판매 & 경매 시작하기
                </Button>
            ) : (
                <div>
                    {a.AuctionMusic_CID[0].auctionComplete === false ? (
                        <div>현재 경매 중인 상품입니다.</div>
                    ) : (
                        <div>현재 판매 중인 상품입니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}
