"use client"
export default function HorisontalMenu({ menu }) {

    const handleClick = (e) => {
        document.getElementById(e.target.dataset.tag)
            .scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
    }

    return (<>
        <div className="container menu-block">
            <ul className="menu">
                {Object.keys(menu).map((key, index) => <li key={index} className="menu-item">
                    <a href="#" className="menu-item" data-tag={key} onClick={handleClick}>{menu[key]}</a>
                </li>)}
            </ul>
        </div>
    </>)
}