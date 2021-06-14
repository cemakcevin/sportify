function dateToString(date) {
    
    let newDate = new Date(date);
    let normalizedDate = new Date(newDate.getTime() - newDate.getTimezoneOffset() * -60000);
    let formattedDate = normalizedDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });   
    
    return formattedDate;
};

export default dateToString;