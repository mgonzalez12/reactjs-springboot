import { useItemsCart } from "./hooks/useItemsCart"
import { Navbar } from "./components/Navbar";
import { CartRoutes } from "./routes/CartRoutes";

export const CartApp = () => {

    const { cartItems, handleAddProductCart, handlerDeleteProductCart } = useItemsCart();
    
    return (
        <>
        <Navbar ></Navbar>
            <div className='container'>
                <h3>Card App</h3>
                <CartRoutes cartItems={cartItems} handleAddProductCart={handleAddProductCart} 
                 handlerDeleteProductCart={handlerDeleteProductCart} />          
                
            </div>
        </>

    )
}
