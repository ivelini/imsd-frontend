export default function ContentComponent({tag, title, content}) {
    return (<>
        <div className="container section" id={tag}>
            <h2 className="section-title">{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </>)
}