import './Header.css'
import BtnLarge from "../BtnLarge/BtnLarge";
import BtnSmall from "../BtnSmall/Btnsmall";
import panier from '../../Assets/icons/panier.png';
import logo from '../../Assets/logo.png';
import {useState} from "react";


export default function Header({items}) {
    const [walletConnected, setWalletConnected] = useState(false);

    /**
     * wallet connection
     * @returns {Promise<void>}
     */
    const handleWalletconnect = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                setWalletConnected(true);
                console.log('Wallet connected:', accounts[0]);

            } catch (error) {
                console.error('User rejected connection', error);
            }
        } else {
            alert('Rabby Wallet n’est pas détecté. Veuillez installer Rabby.');
        }
    }

    return (
        <header className="header">
            <img src={logo} alt=""/>
            <input type="text" placeholder="Find your NFT"/>
            <BtnLarge text={walletConnected ? "Wallet Connected" : "Connect Wallet"} clic={handleWalletconnect}/>
        </header>
    )
}