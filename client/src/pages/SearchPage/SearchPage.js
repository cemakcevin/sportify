import './SearchPage.scss';

function SearchPage() {

    return (
        <main className="search">
            <div className="search__bar-column">
                <form className="search__bar-form">
                    <label className="search__bar-input-container">
                        <span className="search__bar-input-text">Search Your Team</span>
                        <input className="search__bar-input" />
                    </label>
                </form>
            </div>
            <div className="search__result-column">

            </div>
        </main>
    )


}

export default SearchPage;