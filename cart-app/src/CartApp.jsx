import { CartView } from "./components/CartView"
import { CatalogView } from "./components/CatalogView"
import { useItemsCart } from "./hooks/useItemsCart"

export const CartApp = () => {

    const { cartItems, handleAddProductCart, handlerDeleteProductCart } = useItemsCart();
    
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
