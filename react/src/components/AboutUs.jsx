import './AboutUs.css'

export default function AboutUs() {
    return (
        <div className='AboutUs section'>
            <div>
                <img src="/hero.jpg" alt="" />
            </div>
            <div>
                <h2>Naša Priča</h2>
                <h3>Nasleđe u razvoju od 2021</h3>
                <p className='main-description'>
                    The Catering was founded in blabla by Mr. Smith in lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                     exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      iruredolor in reprehenderit in voluptate 
                    velit esse cillum dolore eu fugiat nulla pariatur.We only use seasonal ingredients.
                </p>
                <p className='secondary-description'>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
                    mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod temporincididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </div>
    )
}