
const useDate = () => {
    var today = new Date();
    var dates =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = dates + " " + time;

    return {dateTime}
}

export default useDate;

