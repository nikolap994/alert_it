import Image from 'next/image'

import Navigation from "./nav"

import logoImg from "../src/images/gold.png"


function Header() {
    return (
        <header className="bg-slate-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
                <Image
                    src={logoImg}
                    alt="Logo image"
                    width={100}
                    height={75}
                />
                <Navigation />
            </div>
        </header>
    )
}

export default Header