$(function () {
    calculator();
});

// 복사 기능
function copyPrice() {
    const text = $('#regular_price').text();
    navigator.clipboard.writeText(text).then(function () {
        alert('복사되었습니다.');
    });
}
// 입찰 계산기
function calculator() {
    $('.bid_calculator').on('submit', function (e) {
        // 폼 제출 방지 (서버 전송 X)
        e.preventDefault();
        let price = $('input[name="price"]').val();
        let people = $('input[name="count"]:checked').val();
        // 수수료
        let fee = Math.round(price * 0.05);
        // 손익 분기점
        let bep = Math.floor((price - fee) * ((people - 1) / people));
        // 손익 분기점 분배금
        let distribution = Math.floor(bep / (people - 1));
        // 적정 입찰가
        let regular_price = Math.floor(bep / 1.1);
        // 적정 입찰가 분배금
        let rp_distribution = Math.floor(regular_price / (people - 1));
        // 입찰 한번더 가능한 금액
        let one_more = Math.floor(regular_price / 1.1);

        $('#bep').text(bep);
        $('#fee').text(fee);
        $('#distribution').text(distribution);
        $('#regular_price').text(regular_price);
        $('#rp_distribution').text(rp_distribution);
        $('#one_more').text(one_more);
    });
}

