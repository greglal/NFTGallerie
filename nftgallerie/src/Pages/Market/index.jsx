import './Market.css';
import NftCard from '../../Components/NftCard/NftCard';
import image1 from '../../Assets/image1.jpg';
import baseball from '../../Assets/baseball.jpg';
import desolation from '../../Assets/desolation.jpg';
import empire from '../../Assets/empire.jpg';
import flatiron from '../../Assets/flatiron.jpg';
import incendie from '../../Assets/incendie.jpg';
import metro from '../../Assets/metro.jpg';
import moulin from '../../Assets/moulin.jpg';
import pecheurs from '../../Assets/pechaurs.jpg';
import rue_catherine from '../../Assets/rue_catherine.jpg';
import {useState, useEffect} from "react";
import { marketContract, eurContract} from '../../utils/web3';
import * as signer from "ethers";

export default function Market() {
    const Nfts = [
        {
            id: 1,
            title: 'Romance',
            image: image1,
            description: 'A beautifull landscape in SO of France, with two lovers living their romance',
            price: 10
        },
        {
            id: 2,
            title: 'Nice Throw',
            image: baseball,
            description: 'Yankees vs Red Sox, always a good moment. A nice throw for yankees this time',
            price: 10
        },
        {
            id: 3,
            title: 'Desolation',
            image: desolation,
            description: 'One of my favourite picture. Feeling alone and quiet despite this desolation ',
            price: 10
        },
        {
            id: 4,
            title: 'The Empire',
            image: empire,
            description: 'Greetings from NY City, standing on 5th avenue. A such beautifull building',
            price: 10
        },
        {
            id: 5,
            title: 'The Flatiron',
            image: flatiron,
            description: 'An other great building to see in NY City. View from the Empire State Building',
            price: 10
        },
        {
            id: 6,
            title: 'Bunrt laundry',
            image: incendie,
            description: 'Taken the day after the drama in north of Luxembourg',
            price: 10
        },
        {
            id: 7,
            title: 'NY Subway',
            image: metro,
            description: 'The NY City subway. Always animated. The place to meet persons ',
            price: 10
        },
        {
            id: 8,
            title: 'Le vieux moulin',
            image: moulin,
            description: 'A "moulin" in East of France. Opened for visites each weekend of may ',
            price: 10
        },
        {
            id: 9,
            title: 'Fishers',
            image: pecheurs,
            description: 'A quiet piece of life under the sun for these retires in SO of France',
            price: 10
        },
        {
            id: 10,
            title: 'Catherine Street',
            image: rue_catherine,
            description: 'A small and hidden street in SO of France, where you can taste delicious oysters',
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


