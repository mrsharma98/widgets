import React from 'react'

const Link = ({ className, href, children }) => {

    const onClick = (event) => {
        if(event.metaKey || event.ctrlKey) {
            return 
        }

        event.preventDefault()
        window.history.pushState({}, '', href)
        // this will take us to the defined link w/o reloading the data/tab

        const navEvent = new PopStateEvent('popstate')
        window.dispatchEvent(navEvent)
        // this will communicate with the Route components and 
        // says that url has just changed
    }

    return (
        <a
            onClick={onClick}
            className={className}
            href={href}
        >
            {children}
        </a>
    )
}


export default Link