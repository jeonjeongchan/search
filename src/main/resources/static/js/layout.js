$(function () {

    menuBarHighlight();
    editApiKey ();
    saveApiKey ();
    getApiKey ();
    auctionLoader ();
    characterSubmit();
    //tooltip();
    //dynamicTooltip();
})


function auctionLoader() {
    let isNavigating = false;

    // 1. 페이지 진입 시 바로 로딩화면 보여줌 (새로고침 포함)
    $('#loader').show();

    // 2. 모든 리소스 로딩 완료되면 로딩화면 숨김
    $(window).on('load', function () {
        $('#loader').fadeOut(500); // 부드럽게 사라짐
    });

    // 3. 메뉴 클릭 시 로딩 처리
    $('.menu-bar-link').on('click', function (e) {
        const link = $(this).attr('href');
        const isExternal = /^https?:\/\//.test(link);
        const isNewTab = $(this).attr('target') === '_blank';

        if (isExternal || isNewTab) return;

        e.preventDefault();

        if (isNavigating) return;

        isNavigating = true;
        $('#loader').show();

        setTimeout(function () {
            window.location.href = link;
        }, 300);
    });
}



function menuBarHighlight() {
    const currentPath = window.location.pathname;

    $('.menu-bar-link').each(function () {
        const linkPath = $(this).attr('href');

        if (linkPath === currentPath) {
            $(this).addClass('active');
            $(this).attr('aria-current', 'page');
        } else {
            $(this).removeClass('active');
            $(this).removeAttr('aria-current');
        }
    });
}


function editApiKey () {
    $('#editApiKeyBtn').click(function() {
        $('#apiKeyInput').prop('readonly', false).focus();
        $('#saveApiKeyBtn').show();
        $(this).hide();
    });
}

function saveApiKey () {
    $('#saveApiKeyBtn').click(function() {
        const apiKey = $('#apiKeyInput').val();

        $.ajax({
            url: '/api/apiKey/save',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ apiKey: apiKey }),
            success: function() {
                $('#apiKeyInput').prop('readonly', true);
                $('#saveApiKeyBtn').hide();
                $('#editApiKeyBtn').show();
            },
            error: function() {

            }
        });
    });
}

function getApiKey () {
    $.ajax({
        url: '/api/apiKey',
        method: 'GET',
        success: function(data) {
            if(data.apiKey) {
                $('#apiKeyInput').val(data.apiKey);
            }
        },
        error: function() {
            console.log('API Key를 불러오는데 실패했습니다.');
        }
    });
}

function characterSubmit() {
    $('#characterForm').on('submit', function (event) {
        event.preventDefault();

        const characterName = $('#characterName').val().trim();

        if (characterName) {
            const encodedName = encodeURIComponent(characterName);
            window.location.href = '/characters/' + encodedName;
        }
    });
}


function tooltip() {
    $('[data-bs-toggle="tooltip"]').each(function() {
        new bootstrap.Tooltip(this);
    });
}

function dynamicTooltip() {
    $(document).on('mouseenter', '[data-bs-toggle="tooltip"]', function() {
        if (!bootstrap.Tooltip.getInstance(this)) {
            new bootstrap.Tooltip(this);
        }
    });
}
