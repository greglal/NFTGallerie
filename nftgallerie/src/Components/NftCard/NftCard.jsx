import './NftCard.css'
import {useState} from "react";
import addBasket from '../../Assets/icons/addToBasket.png'
import { marketContract, eurContract } from '../../utils/web3';

export default function NftCard ({ item }) {
    const [isVisible, setIsVisible] = useState(false)

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible)
    }

    const handleBuyNFT = async (quantity = 1) => {
        try {
            // 1. Récupération des comptes
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // 2. Calcul du montant total (en raw, donc 10.000 pour 1 NFT si 4 décimales)
            const unitPrice = 10000; // 10 * 10^4
            const totalPrice = unitPrice * quantity;

            // 3. Approve le contrat Market pour qu’il puisse prendre les tokens
            const approveTx = await eurContract.approve(marketContract.target, totalPrice);
            await approveTx.wait();
            console.log("Approbation réussie");

            // 4. Appel du smart contract pour acheter les NFTs
            const purchaseTx = await marketContract.purchase(quantity);
            await purchaseTx.wait();
            console.log(`NFT acheté avec succès (${quantity})`);

        } catch (error) {
            console.error("Erreur lors de l'achat :", error);
        }
    };

    return (
        <article className="nft-card">
            <img src={item.image} alt={item.title} onClick={handleToggleVisibility} className='nft-img'/>
            <div className='nft-desc-card'>
                <h2 className='nft-title'>{item.title}</h2>
                <div className='nft-desc-section'>
                    <div className='nft-desc' style={{width: '65%'}}>
                        <p style={{color: 'grey'}}>Description :</p>
                        <p className='nft-desc-p'>{item.description}</p>
                    </div>
                    <div className='nft-desc' style={{width: '30%'}}>
                        <p style={{color: 'grey'}}>Price :</p>
                        <p className='nft-desc-p'>{item.price} EUR</p>
                    </div>
                </div>
                <div className="addBasket">
                    <img src={addBasket} alt="ajouter au panier" onClick={()=> handleBuyNFT(1)}/>
                </div>
            </div>
            {isVisible &&
                <>
                    <div className="overlay" onClick={handleToggleVisibility}></div>

                    <div className="modal">
                        <img src={item.image} alt={item.title} />
                    </div>
                </>
            }
        </article>
    )
}