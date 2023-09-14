import { useEffect, useReducer } from "react"
import { CartView } from "./components/CartView"
import { CatalogView } from "./components/CatalogView"
import { itemsReducer } from "./reducer/itemsReducer";
import { AddProductCart, DeleteProductCart, UpdateQuantityProductCart } from "./reducer/itemsActions";

const initialCartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

export const CartApp = () => {

    //const [cartItems, setCartItems] = useState(initialCartItems);
    const [cartItems, dispatch ] = useReducer(itemsReducer, initialCartItems);

    useEffect( () =>  {
        sessionStorage.setItem('cart',JSON.stringify(cartItems));
    }, [cartItems])


    const handleAddProductCart = (product) => {
        // verificar si el id del product existe
        const hasItem = cartItems.find((i) => i.product.id === product.id);
        if (hasItem) {
           dispatch(
             {
                type: UpdateQuantityProductCart,
                payload: product
             }
           )
        } else {
            dispatch({
                type: AddProductCart,
                payload: product,
            });
        }
    }

    const handlerDeleteProductCart = (id) => {
        dispatch({
            type: DeleteProductCart,
            payload: id
        });
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
