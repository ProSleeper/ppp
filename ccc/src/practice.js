const Parse_Day = (today) => {
    const formattedDate = `${today.substring(0, 4)}-${today.substring(4, 6)}-${today.substring(6, 8)}`;
    const day = new Date(formattedDate);
    return day.getDate();
};

console.log(Parse_Day("20200607"));
