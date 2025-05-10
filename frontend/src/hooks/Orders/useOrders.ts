import { useEffect, useState } from 'react';
import { getUserOrders } from '@api/Orders/fetchOrders';
import { OrderResponseModel } from '@models/OrderResponseModel';

const useOrders = (userToken: string) => {
  const [orders, setOrders] = useState<OrderResponseModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getUserOrders(userToken);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) {
      fetchOrders();
    }
  }, [userToken]);

  return { orders, loading };
};

export default useOrders;
