class DateUtil {
    format = (date, datePattern) => {
        let result = datePattern;

        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();

        if (year.toString().length < 4) {
            year = [...Array(4 - year.toString().length.fill('0'))].join('') + year;
        }

        const formatedDate = {
            MM: month < 10 ? "0" + month : month,
            dd: day < 10 ? "0" + day : day,
            yyyy: year
        }

        for(const dateUnit in formatedDate) {
            result = result.replace(dateUnit, formatedDate[dateUnit]);
        }

        return result;
    }
}

export default DateUtil;