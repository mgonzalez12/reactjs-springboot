import { useState } from "react"
import { CartView } from "./components/CartView"
import { CatalogView } from "./components/CatalogView"
import { products } from "./data/products"

const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

export const CartApp = () => {

    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleAddProductCart = (product) => {
        // verificar si el id del product existe
        const hasItem = cartItems.find((i) => i.product.id === product.id);
        if (hasItem) {
             // con filter
            /*setCartItems([
                ...cartItems.filter((i) => i.product.id !== product.id ),
                {
                    product,
                    quantity: hasItem.quantity + 1,
                }
            ])*/

            setCartItems(
                cartItems.map((i) => {
                    if(i.product.id === product.id){
                        i.quantity = i.quantity + 1;
                    }
                    return i;
                })
            )
        } else {
            setCartItems([
                ...cartItems,
                {
                    product, // product:product  el nombre del objeto es igual al nombre del que recibe
                    quantity: 1,
                }
            ])
        }
    }

    const handlerDeleteProductCart = (id) => {
        setCartItems([
            ...cartItems.filter((i) => i.product.id !== id )
        ])
    }

    return (
        <>
            <div className='container'>
                <h3>Card App</h3>
                <CatalogView handler={handleAddProductCart} />

                {cartItems?.length <= 0 || (
                <div className='my-4 w-50'>
                    <CartView items={cartItems} handlerDelete={handlerDeleteProductCart} />
                </div>
                )}
            </div>
        </>

    )
}
