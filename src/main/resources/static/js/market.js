$(function () {
    marketInit();
});

// 거래소
function marketInit() {

    let $marketTable = $('#market-table-body');
    let marketData = marketInfo;

    if (marketData != null) {
        let marketParsing = JSON.parse(marketData);

        marketParsing.Items.forEach(market => {

            const diff = market.CurrentMinPrice - market.YDayAvgPrice;

            const formattedDiff = diff.toLocaleString();
            let icon = '';
            let color = '';

            if (diff > 0) {
                icon = '<i class="fa-solid fa-caret-up"></i>'; // 삼각형 느낌
                color = 'green';
            } else if (diff < 0) {
                icon = '<i class="fa-solid fa-caret-down"></i>';
                color = 'red';
            } else {
                icon = '<i class="fa-solid fa-minus"></i>';
                color = 'gray';
            }

            $marketTable.append(`
                    <tr>
                        <td class="icon-cell">
                            <img class="icon-img" src="${market.Icon}" alt="아이템 아이콘">
                        </td>
                        <td>${market.Name}</td>
                        <td>${market.CurrentMinPrice.toLocaleString()} 골드</td>
                        <td><span style="color:${color}">${formattedDiff}&nbsp;&nbsp;&nbsp;${icon}</span></td>
                    </tr>
                `);

        });
    }


}