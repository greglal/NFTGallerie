import './BtnLarge.css'

export default function BtnLarge({text, clic, img}){
    return (
        <button className='btn-large' onClick={clic}>
            {img && <img src={img} alt={text} />}
            {text}
        </button>
    )
}