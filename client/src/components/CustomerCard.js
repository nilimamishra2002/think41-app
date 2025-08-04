import React from 'react';
import { Link } from 'react-router-dom';

const CustomerCard = ({ customer }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
      <h4>{customer.first_name} {customer.last_name}</h4>
      <p>Email: {customer.email}</p>
      <p>Orders: {customer.order_count}</p>
      <Link to={`/customer/${customer.user_id}`}>View Details</Link>
    </div>
  );
};

export default CustomerCard;