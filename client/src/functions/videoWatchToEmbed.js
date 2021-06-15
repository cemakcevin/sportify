// this function converts watch urls into embed urls
// Ex. "https://www.youtube.com/watch?v=LuV0IYO90iM" ==> "https://www.youtube.com/embed/LuV0IYO90iM"

const videoWatchToEmbed = (watchUrl) => {

    const watchUrlArr = watchUrl.split("watch?v=");
    const embedUrl =  watchUrlArr[0] + "embed/" + watchUrlArr[1];

    return embedUrl;
}

export default videoWatchToEmbed;