import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = () => {

    const [term, setTerm] = useState('programming')
    const [results, setResults] = useState([])

    // console.log(results);

    useEffect(() => {
        let timeoutId
        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                }
            })

            setResults(data.query.search);
        }

        // when component renders for the first time
        if (term && !results.length) {
            search()
        } else {
            timeoutId = setTimeout(() => {
                if (term) {
                    search()
                }
            }, 500)
        }


        // these async fns always gives back an identifier
        // we can perform any task like clearing that fn using that identifier

        return () => {
            clearTimeout(timeoutId)
        }

    }, [term])

    const renderedResults = results.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {/* as we are hvaing html elements inside the data, so we are removing it using dangerous.... */}
                    {/* that will convert it to the html but while inspecting we will see the html also. */}
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input
                        className="input"
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="ui celled list">
                {renderedResults}
            </div>

        </div>
    )
}

export default Search