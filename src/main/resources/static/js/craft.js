$(function () {
    //craftInit();
});

// 거래소
function craftInit() {

    let $craftTable = $('#craft-table-body');
    let craftData = craftInfo;

    if (craftData != null) {
        let craftParsing = JSON.parse(craftData);

        craftParsing.Items.forEach(craft => {

            $craftTable.append(`
                    <tr>
                        <td class="icon-cell">
                            <img class="icon-img" src="${craft.Icon}" alt="아이템 아이콘">
                        </td>
                        <td>${craft.Name}</td>
                        <td>${craft.CurrentMinPrice.toLocaleString()} 골드</td>
                    </tr>
                `);

        });
    }


}