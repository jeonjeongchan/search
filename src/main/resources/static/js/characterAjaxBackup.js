
// $('.character').append(`
//         <div class="character-menu">
//             <button id="character-ability">능력치</button>
//             <button id="character-sibling-button">원정대</button>
//             <button>길드</button>
//             <button>수집</button>
//         </div>
//         <div class="character-content"> </div>
//
//         characterAbilityButton();
//         characterSiblingButton();
// `);








function siblingInit (data) {
    let siblingsData = data;
    let $sibilngsInfo = $('.character-content');

    if (siblingsData != null  && siblingsData !== "null") {

        let siblingsParsing = JSON.parse(siblingsData);

        $sibilngsInfo.empty();
        $sibilngsInfo.append(`
            <table>
                <thead>
                <tr>
                    <th class="icon-cell"></th>
                    <th>서버</th>
                    <th>이름</th>
                    <th>아이템레벨</th>
                    <th>클래스</th>
                    <th>전투레벨</th>
                </tr>
                </thead>
                <tbody id="siblings-body">

                </tbody>
            </table>   
         `);

        // 내림 차순
        siblingsParsing.sort((a, b) => {
            const priceA = parseInt(a.ItemMaxLevel.replace(/[^0-9]/g, ''), 10);
            const priceB = parseInt(b.ItemMaxLevel.replace(/[^0-9]/g, ''), 10);
            return priceB - priceA; // 오름차순 (내림차순은 반대로)
        });

        siblingsParsing.forEach(sibling => {
            $('#siblings-body').append(`
                     <tr>
                        <td class="icon-cell"></td>
                        <td>${sibling.CharacterName}</td>
                        <td>${sibling.ItemMaxLevel}</td>
                        <td>${sibling.CharacterClassName}</td>
                        <td>${sibling.CharacterLevel}</td>
                        <td>${sibling.ServerName}</td>
                    </tr>
                   
                `);

        });
    }
}




function characterAbilityInit (data) {
    let abilityData = data;
    let $abilityInfo = $('.character-content');

    if (abilityData != null && abilityData !== "null") {
        debugger;
        let abilityParsing = JSON.parse(abilityData);
        $abilityInfo.empty();

        $abilityInfo.append(`
            <div class="engravings"></div>
            <div class="avatars"></div>
            <div class="cards"></div>
            <div class="arkPassives"></div>
        `);


        abilityParsing.ArkPassive.Effects.forEach(effect => {
            $('.arkPassives').append(`
                    <img src="${effect.Icon}"></img>
                    <p>${effect.Name}</p>
                    <p>${effect.Description}</p>
                    
                `);

        });

    }
}


function siblingRequest(characterName) {
    $.ajax({
        url: '/api/character/siblings/' + characterName,
        method: 'GET',
        success: function(data) {
            siblingInit (data);
        },
        error: function(xhr) {
            console.error('실패:', xhr.responseText);
        }
    });

}



function characterAbilityRequest(characterName) {
    $.ajax({
        url: '/api/character/' + characterName,
        method: 'GET',
        success: function(data) {
            characterAbilityInit(data);
        },
        error: function(xhr) {
            console.error('실패:', xhr.responseText);
        }
    });

}



function characterSiblingButton () {
    $('#character-sibling-button').click(function () {

        const pathParts = window.location.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1]; // '홍길동'

        siblingRequest(lastPart);
    });
}



function characterAbilityButton() {
    $('#character-ability').click(function () {

        const pathParts = window.location.pathname.split('/');
        const lastPart = pathParts[pathParts.length - 1]; // '홍길동'

        characterAbilityRequest(lastPart);
    });
}