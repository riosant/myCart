const Rating = ({count}) => {

    let content = [];
    for (var i = 0; i < 5; i++)
        content.push(<span className={`${i < count && 'text-warning'} fas fa-star`}  key={i}></span>)
    return <div>{content}</div>
}

export default Rating