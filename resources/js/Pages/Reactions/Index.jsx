import React from 'react'

document.addEventListener('keydown', e => {
    let meta = e.metaKey || e.ctrlKey
    if (meta && e.code == "KeyK") {
        e.preventDefault()
        document.getElementById('search-box').focus()
    }
})

const getQueryParam = param => {
    const params = new URLSearchParams(window.location.search)
    return params.get(param)
}

const copyToClipboard = reaction => async () => {
    await navigator.permissions.query({name: 'clipboard-write'})
    let blob = new Blob([reaction.url], {type: 'text/plain'})
    let item = new ClipboardItem({'text/plain': blob})

    await navigator.clipboard.write([item])
}

const Reaction = reaction => <div className="p-3 m-3 cursor-pointer hover:bg-yellow-100" key={reaction.id} onClick={copyToClipboard(reaction)}>
    <div className="text-center w-full">
        <img src={"https://" + reaction.url} alt="" className="mx-auto" style={{maxWidth: 200, minWidth: 100}} />
    </div>
    {reaction.name}
</div>

const SearchBar = () => <form method="GET" action="/">
    <input
        id="search-box"
        defaultValue={getQueryParam('search')}
        name="search"
        className="w-full px-3 py-3 shadow text-5xl text-gray-700 outline-none border-none mb-3" />
</form>

export default function Index({ reactions }) {
    return (
        <div>
            <SearchBar />
            <div className="grid justify-items-center grid-cols-1 md:grid-cols-5 ">
                {[...reactions].reverse().map(Reaction)}
            </div>
        </div>
    )
}