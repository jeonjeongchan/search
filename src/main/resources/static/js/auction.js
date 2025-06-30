$(function () {
    //gemLevel();
    //getGem();
    //getGemSelect();
    getGemsInit();
});



function getGemsInit() {

    let $damageGemTable = $('#damage-gem-table-body');
    let $coolDownGemTable = $('#coolDown-gem-table-body');
    let damageGemsData = damageGems;
    let coolDownGemData = coolDownGems;

    if (damageGemsData != null) {
        let damageGemsParsing = JSON.parse(damageGemsData);

        damageGemsParsing.forEach(gem => {

            console.log(gem.Name);
            $damageGemTable.append(`
                    <tr>
                        <td class="icon-cell">
                            <img class="icon-img" src="${gem.Icon}" alt="아이템 아이콘">
                        </td>
                        <td>${gem.Name}</td>
                        <td>${gem.AuctionInfo.BuyPrice.toLocaleString()} 골드</td>
                    </tr>
                `);

        });
    }

    if (coolDownGemData != null) {
        let coolDownGemsParsing = JSON.parse(coolDownGemData);

        coolDownGemsParsing.forEach(gem => {

            console.log(gem.Name);
            $coolDownGemTable.append(`
                    <tr>
                        <td class="icon-cell">
                            <img class="icon-img" src="${gem.Icon}" alt="아이템 아이콘">
                        </td>
                        <td>${gem.Name}</td>
                        <td>${gem.AuctionInfo.BuyPrice.toLocaleString()} 골드</td>
                    </tr>
                `);

        });
    }
}












function getGem() {
    const gemLevel = $('#level').val();
    const gemType = $('#type').val();

    $.ajax({
        url: '/api/auction/gem',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ level : gemLevel, type : gemType }),
        success: function (data) {
            debugger;
            // 테이블 초기화
            $('#auction-table-body').empty();

            // 결과 출력
            if (data.Items && data.Items.length > 0) {

                data.Items.some(auction => {
                    $('#auction-table-body').append(`
                                <tr>
                                    <td class="icon-cell">
                                        <img class="icon-img" src="${auction.Icon}" alt="아이템 아이콘">
                                    </td>
                                    <td>${auction.Name}</td>
                                    <td>${auction.AuctionInfo.BuyPrice} 골드</td>
                                </tr>
                                `);
                    return true; // 첫 항목 처리 후 중단
                });
            } else {
                const $row = $('<tr></tr>');
                const $cell = $('<td></td>')
                    .attr('colspan', 3) // 헤더의 열 수에 맞춰야 함
                    .css('text-align', 'center')
                    .text('검색 중 문제가 발생 하였습니다.');

                $row.append($cell);
                $('#auction-table-body').append($row);

            }

        },
        error: function () {
            // 테이블 초기화
            $('#auction-table-body').empty();
            const $row = $('<tr></tr>');
            const $cell = $('<td></td>')
                .attr('colspan', 3) // 헤더의 열 수에 맞춰야 함
                .css('text-align', 'center')
                .text('검색 결과가 없습니다.');

            $row.append($cell);
            $('#auction-table-body').append($row);
        }
    });
}

function gemLevel() {
    // 보석 레벨
    for (let i = 10; i > 0; i--) {
        $('#level').append(`<option value="${i}">${i}</option>`);
    }
}

function getGemSelect() {
    // 보석 검색
    $('#gemSelectForm').on('submit', function (e) {
        e.preventDefault();
        getGem();

    });

}

