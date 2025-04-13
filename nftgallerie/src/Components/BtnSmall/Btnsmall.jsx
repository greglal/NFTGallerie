import './Btnsmall.css';


export default function BtnSmall({clic, image}){
        return(
            <div className='btn-small'>
                <img src={image} alt='' onClick={clic}/>
            </div>

        )

}