import { Button, Label, Radio } from "flowbite-react";
import { useAccount } from "wagmi";
import { useState } from "react";
import { ConnectKitButton } from "connectkit";
import { useSwitchChain } from "wagmi";

export const CHAIN_IDS = [
    { chainID: 31337, chainName: 'Ethereum Localnet',currency:'ETH',explorer:'' }
];

export default function ChooseChainComponent() {
    const account = useAccount();
    const { chains, switchChain } = useSwitchChain()
    const [selectedChain, setSelectedChain] = useState(account?.chainId || ''); // Fallback to an empty string if undefined

    const handleChainChange = (event) => {
        setSelectedChain(Number(event.target.value));
    };

    console.log(account.chainId);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Choose Your Chain
                </h2>
            </div>


            <fieldset className="mt-4 flex max-w-md flex-col gap-4">
                {CHAIN_IDS.map((chain, index) => (
                    <div key={chain.chainID} className="flex items-center gap-2">
                        <Radio
                            id={`chain-${index}`}
                            name="chain"
                            value={chain.chainID}
                            checked={Number(selectedChain) === chain.chainID}
                            onChange={handleChainChange}
                        />
                        <Label className="text-lg" htmlFor={`chain-${index}`}>
                            {chain.chainName}
                        </Label>
                    </div>
                ))}
            </fieldset>

           
        </div>
    );
}
