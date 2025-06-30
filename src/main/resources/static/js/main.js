$(function () {
    // 공지사항
    let noticesData = notices;
    let noticesParsing = JSON.parse(noticesData);
    noticeInit(noticesParsing);

    // 진행중 이벤트
    let eventsData = events;
    let eventsParsing = JSON.parse(eventsData);
    eventsInit(eventsParsing);

    // 모험 섬
    let gameContentsData = gameContents;
    let gameContentsParsing = JSON.parse(gameContentsData);
    gameContentsInit(gameContentsParsing);

});

// 메인 화면 오늘 날짜 표시
function formatTodayDate() {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[today.getDay()];

    return `${year}.${month}.${date}(${day})`;

}

// 필보, 카게 표시 (오늘 날짜 기준)
function todayContents() {
    const schedule = {
        '일': ['필보', '카게'],
        '월': ['카게'],
        '화': ['필보'],
        '수': [],
        '목': ['카게'],
        '금': ['필보'],
        '토': ['카게']
    };

    const valueMap = {
        '필보': 1,
        '카게': 2
    };

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    const todayName = dayNames[today.getDay()];

    const items = schedule[todayName] || [];

    return items.length ? items.join(', ') : '없음';
}


// 공지사항 리스트
function noticeList(noticesParsing, page) {

    const settingPage = 5;
    const $ul = $('#notice-list');

    $ul.empty(); // 기존 내용 비우기
    let start = (page - 1) * settingPage;
    let end = start + settingPage;
    let pageItems = noticesParsing.slice(start, end);

    $.each(pageItems, function (index, notice) {
        let $li = $('<li></li>');
        let $link = $('<a></a>')
            .attr('href', notice.Link)
            .html(`<strong>${notice.Title}</strong><small>${formatApiDate(notice.Date)}</small>`);
        $li.append($link);
        $ul.append($li);
    });
}

// 공지사항
function noticeInit(noticesParsing) {

    const $pagination = $('#pagination');
    // 한 페이지 세팅
    const settingPage = 5;
    // 총 페이지 수
    const totalPages = Math.ceil(noticesParsing.length / settingPage);

    noticePagination(noticesParsing, 1, totalPages);
    noticeList(noticesParsing, 1);

    // 첫 페이지 활성화
    $pagination.find('button').first().addClass('active');
}


// 공지사항 페이지 버튼
function noticePagination(noticesParsing, currentPage, totalPages) {

    const $pagination = $('#pagination');
    const pagesPerBlock = 10;
    const currentBlock = Math.ceil(currentPage / pagesPerBlock);
    const startPage = (currentBlock - 1) * pagesPerBlock + 1;
    const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

    $pagination.empty();

    // 이전 버튼
    if (startPage > 1) {
        const $prev = $('<button></button>')
            .text('이전')
            .addClass('page-btn')
            .on('click', function () {
                noticePagination(noticesParsing,startPage - 1, totalPages);
                noticeList(noticesParsing, startPage - 1);
            });
        $pagination.append($prev);
    }

    // 페이지 번호 버튼
    for (let i = startPage; i <= endPage; i++) {
        const $btn = $('<button></button>')
            .text(i)
            .addClass('page-btn')
            .toggleClass('active', i === currentPage)
            .on('click', function () {
                noticeList(noticesParsing, i);
                noticePagination(noticesParsing, i, totalPages);
            });
        $pagination.append($btn);
    }

    // 다음 버튼
    if (endPage < totalPages) {
        const $next = $('<button></button>')
            .text('다음')
            .addClass('page-btn')
            .on('click', function () {
                noticePagination(noticesParsing,endPage + 1, totalPages);
                noticeList(noticesParsing, endPage + 1);
            });
        $pagination.append($next);
    }

}







// 진행중 이벤트
function eventsInit(eventsParsing) {
    // 현재 날짜
    $('#today-date').text(formatTodayDate());
    $('#today-content').text(todayContents());

    const $ul = $('#event-list');
    $.each(eventsParsing, function (index, event) {
        let $li = $('<li></li>');

        // 이미지 태그 생성
        let $img = $('<img>')
            .attr('src', event.Thumbnail)
            .attr('alt', event.Title);
            // .css({width: '250px', height: '150px'});

        let $link = $('<a></a>')
            .attr('href', event.Link)
            .html(`<p><strong>${event.Title}</strong><br>${formatApiDate(event.StartDate)} ~ ${formatApiDate(event.EndDate)}</p>`);

        $link.prepend($img);

        $li.append($link);
        $ul.append($li);
    });
}

// 모험 섬
function gameContentsInit(gameContentsParsing) {

    const $ul = $('#gameContents-list'); // ul 요소
    const now = new Date();

    // 1. "모험 섬" 콘텐츠들 중 미래 시간만 모아서 배열로 저장 (Date 객체만)
    let futureTimes = [];
    gameContentsParsing.forEach(gc => {
        if (gc.CategoryName && gc.CategoryName.trim() === "모험 섬") {
            gc.StartTimes.forEach(timeStr => {
                const time = new Date(timeStr);
                if (time > now) {
                    futureTimes.push(time);
                }
            });
        }
    });

    // 2. 가장 가까운 미래 시간 하나 선택
    if (futureTimes.length === 0) {
        console.log("출력할 콘텐츠가 없습니다.");
    } else {
        const closestTime = futureTimes.sort((a, b) => a - b)[0].getTime();

        // 3. 가장 가까운 시간과 정확히 일치하는 콘텐츠만 출력
        $.each(gameContentsParsing, function (index, gameContent) {
            if (gameContent.CategoryName && gameContent.CategoryName.trim() === "모험 섬") {
                const matchedTimeStr = gameContent.StartTimes.find(timeStr => {
                    return new Date(timeStr).getTime() === closestTime;
                });

                if (matchedTimeStr) {
                    const date = new Date(matchedTimeStr);
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const formattedTime = `${hours}:${minutes} 입장 가능`;

                    let $li = $('<li></li>');

                    let $img = $('<img>')
                        .attr('src', gameContent.ContentsIcon)
                        .attr('alt', `${gameContent.ContentsName} 아이콘`);
                        // .css({width: '24px', height: '24px', marginRight: '8px', verticalAlign: 'middle'});

                    let $link = $('<a></a>')
                        .html(`<strong>${gameContent.ContentsName}</strong>`);

                    let $timeSpan = $('<span></span>')
                        .text(` - ${formattedTime}`);
                        // .css({marginLeft: '8px', color: '#666'});

                    $li.append($img).append($link).append($timeSpan);
                    $ul.append($li);
                }
            }
        });
    }
}