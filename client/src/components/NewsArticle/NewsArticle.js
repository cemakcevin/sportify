import './NewsArticle.scss';
import {Link} from 'react-router-dom';

function NewsArticle ({className, newsArticle}) {
    
    const {title, image, url} = newsArticle;

    return (
        <a href={url} target="_blank">
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