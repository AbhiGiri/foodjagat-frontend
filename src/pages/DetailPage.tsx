import { useCreateCheckoutSession } from "@/apis/OrderApi";
import { useGetRestaurant } from "@/apis/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType} from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
 const {restaurantId} = useParams();
 const {restaurant, isLoading} = useGetRestaurant(restaurantId);
 const {createCheckoutSession, isLoading: isCheckoutLoading} = useCreateCheckoutSession();

 const [cartItems, setCartItems] = useState<CartItem[]>(() => {
  const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
  return storedCartItems ? JSON.parse(storedCartItems) : [];
 })

 if(isLoading || !restaurant) {
  return "Loading..."
 };

 const addToCard = (menuItem: MenuItemType) => {
  setCartItems((prevCartItems) => {
    //1. Check if the item is already in the cart;
    const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);
    let updatedCartItem;
    //2. if item is in cart, update the quantity;
    if(existingCartItem) {
      updatedCartItem = prevCartItems.map((cartItem) => 
        cartItem._id === menuItem._id
          ? {...cartItem, quantity: cartItem.quantity + 1}  
          : cartItem
      )
    } else {
      updatedCartItem = [
        ...prevCartItems, {
          _id: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        }
      ]
    };

    sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItem));

    // 3.If item is not in cart, add it as a new item
    return updatedCartItem;
  })
 };

 const removeFromItem = (cartItem: CartItem) => {
  setCartItems((prevCartItems) => {
    const updatedCartItem = prevCartItems.filter((item) => cartItem._id !== item._id);
    sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItem));
    return updatedCartItem;
  })
 };

 const onCheckout = async (userFormData: UserFormData) => {
  if(!restaurant) {
    return
  };

  console.log('userFormData', userFormData);
  const checkoutData = {
    cartItems: cartItems.map((cartItem) => ({
      menuItemId: cartItem._id,
      name: cartItem.name,
      quantity: cartItem.quantity.toString()
    })),
    restaurantId: restaurant._id,
    deliveryDetails: {
      name: userFormData.name,
      addressLine1: userFormData.addressLine1,
      city: userFormData.city,
      country: userFormData.country,
      email: userFormData.email as string
    }
  };

  const data = await createCheckoutSession(checkoutData);
  window.location.href = data.url;
   
 };

 return (
  <div className="flex flex-col gap-10">
    <AspectRatio ratio={16 / 5}>
      <img src={restaurant?.imageUrl} className="rounded-md object-cover h-full w-full"/>
    </AspectRatio>
    <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
      <div className="flex flex-col gap-4">
        {/* Check if restaurant is defined before passing it to RestaurantInfo */}
        {restaurant && <RestaurantInfo restaurant={restaurant}/>}
        <span className="text-2xl font-bold tracking-tight">Menu</span>
        {restaurant?.menuItems.map((menuItem, index) => (
          <MenuItem key={index} menuItem={menuItem} addToCard={() => addToCard(menuItem)}/>
        ))}
      </div>
      <div>
        <Card>
          {restaurant && <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromItem={removeFromItem}/>}
          <CardFooter className="mt-5">
            <CheckoutButton onCheckout={onCheckout} disabled={cartItems.length === 0} isLoading={isCheckoutLoading}/>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
 )
}

export default DetailPage;