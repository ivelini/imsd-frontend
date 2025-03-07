export default function SpecificationsContent({ specifications }) {

    function returnHtmlTypeSpecification(type, title) {
        return (<>
            {typeof specifications[type] != 'undefined' && (
                <div>
                    <div>{title}</div>
                    {specifications[type].map((el) => (

                        <div key={el.id}>
                            <input type="checkbox"
                                value={el.id}
                                onChange={() => {
                                    console.log(el)
                                }}
                                
                            />
                            <span>{el.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </>)
    }

    return (<>
        {returnHtmlTypeSpecification('default', 'Рекомендованная')}
        {returnHtmlTypeSpecification('alternative', 'Альтернатива')}
        {returnHtmlTypeSpecification('tuning', 'Тюнинг')}
    </>)
}