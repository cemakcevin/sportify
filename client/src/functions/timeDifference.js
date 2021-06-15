
function timeDifference(currentTime, previousTime) {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let timeDifference = currentTime - previousTime;

   if (timeDifference < msPerMinute) {
        if(Math.round(timeDifference/1000) > 1) {
            return Math.round(timeDifference/1000) + ' seconds ago'
        } else {
            return '1 second ago'; 
        }  
    } else if (timeDifference < msPerHour) {
        if(Math.round(timeDifference/msPerMinute) > 1 ) {
            return Math.round(timeDifference/msPerMinute) + ' minutes ago'
        } else {
            return '1 minute ago';   
        }
    } else if (timeDifference < msPerDay ) {
        if(Math.round(timeDifference/msPerHour) > 1) { 
            return Math.round(timeDifference/msPerHour ) + ' hours ago';   
        } else {
            return '1 hour ago';
        }
    } else if (timeDifference < msPerMonth) {
        if(Math.round(timeDifference/msPerDay) > 1) {
            return Math.round(timeDifference/msPerDay) + ' days ago';   
        } else {
            return '1 day ago'; 
        }
    } else if (timeDifference < msPerYear) {
        if(Math.round(timeDifference/msPerMonth) > 1) {
            return Math.round(timeDifference/msPerMonth) + ' months ago'; 
        } 
        else {
            return '1 month ago';
        } 
    } else {
        if (Math.round(timeDifference/msPerYear ) > 1) {
            return Math.round(timeDifference/msPerYear ) + ' years ago'
        }
        else { 
            return '1 year ago'; 
        }  
    }
}

export default timeDifference;