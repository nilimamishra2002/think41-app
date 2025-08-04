import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCustomerById, fetchOrdersByCustomer } from '../services/api';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCustomerById(id).then(setCustomer);
    fetchOrdersByCustomer(id).then(data => setOrders(data.orders));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div>
      <h2>{customer.first_name} {customer.last_name}</h2>
      <p>Email: {customer.email}</p>
      <p>Orders: {customer.order_count}</p>
      <h3>Orders:</h3>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>Order ID: {order.order_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerDetail;