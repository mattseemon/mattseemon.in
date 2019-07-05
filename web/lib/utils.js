export function GetFormattedDate(date) {
    return require('dateformat')(date, "mmmm dS, yyyy");
}