interface ItemCheckoutProps {
  name: string;
  quantity: number;
  cost: number;
}

const ItemCheckout: React.FC<ItemCheckoutProps> = ({ name, quantity, cost }) => {
  return (
    <div className="mt-7 flex flex-1 text-gray-800 text-lg font-normal">
      <h3>{name}</h3>
      <h3 className="flex-auto text-right pr-4 md:pr-5 lg:pr-4">{quantity}x</h3>
      <h3>${cost}</h3>
    </div>
  );
};

export default ItemCheckout;
