function formatApiDate(date) {
    // date가 Date 객체가 아닐 때 변환 시도
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    let timeDiff = date.getTimezoneOffset();
    date.setHours(date.getHours() - (timeDiff / 60));
    return date.toISOString().split('T')[0];
}