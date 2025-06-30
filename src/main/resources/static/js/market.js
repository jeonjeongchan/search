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

            $marketTable.append(`
                    <tr>
                        <td class="icon-cell">
                            <img class="icon-img" src="${market.Icon}" alt="아이템 아이콘">
                        </td>
                        <td>${market.Name}</td>
                        <td>${market.CurrentMinPrice.toLocaleString()} 골드</td>
                    </tr>
                `);

        });
    }


}