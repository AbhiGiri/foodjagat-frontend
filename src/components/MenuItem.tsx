import { MenuItem as MItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";


type Props = {
 menuItem: MItem;
 addToCard: () => void;
}

const MenuItem = ({menuItem, addToCard}: Props) => {
 
  return (
    <Card className="cursor-pointer" onClick={addToCard}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">₹{(menuItem.price / 100).toFixed(2)}</CardContent>
    </Card>
  )
}

export default MenuItem;