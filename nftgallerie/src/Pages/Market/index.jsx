import './Market.css';
import NftCard from '../../Components/NftCard/NftCard';
import image1 from '../../Assets/image1.jpg';
import {useState, useEffect} from "react";
import { marketContract, eurContract} from '../../utils/web3';
import * as signer from "ethers";

export default function Market() {
    const Nfts = [
        {
            id: 1,
            title: 'My First NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 2,
            title: 'My Second NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 3,
            title: 'My Third NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 4,
            title: 'My Fourth NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 5,
            title: 'My Fifth NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 6,
            title: 'My sixth NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 7,
            title: 'My Seventh NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 8,
            title: 'My Heigth NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 9,
            title: 'My ninth NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
        {
            id: 10,
            title: 'My Tenth NFT',
            image: image1,
            description: 'This is my first NFT!',
            price: 10
        },
    ]

    const [basket, setBasket] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        console.dir(basket, { depth: null})
    }, [basket])

    const handlePurchase = async () => {
        setLoading(true);
        try {
            const totalPriceInEUR = basket.reduce((acc, nft) => acc + nft.price, 0)

            // check user's balance
            const userBalance = await eurContract.balanceOf(await signer.getAddress());
            if (userBalance < totalPriceInEUR) {
                alert('Solde insuffisant');
                setLoading(false);
                return;
            }

            // call market contract's purchase function
            await marketContract.purchase(basket.length);

            alert('Achat réussi !');

            // clean up basket
            setBasket([]);
        } catch (error) {
            console.error("Erreur lors de l'achat:", error);
            alert('Erreur lors de l\'achat');
        }
        setLoading(false);
    };


    return (
        <div className="App">
            {Nfts.map((nft, index) => {
                return(
                    <NftCard item={nft} onAdd={() => {
                        setBasket([...basket, nft])
                    }}/>
                )
            })
            }

        </div>
    );
}


