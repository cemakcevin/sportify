import './NewsArticle.scss';

function NewsArticle ({className, newsArticle}) {
    
    const {title, image, url} = newsArticle;

    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <article className={`${className} article`}>
                <img className="article__img" src={image} alt="news article"/>           
                <div className="article__description-container">
                    <h3 className="article__title">{title}</h3>
                </div>
            </article>
        </a>   
    )
}

export default NewsArticle;