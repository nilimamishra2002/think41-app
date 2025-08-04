import React, { useEffect, useState } from 'react';
import { fetchCustomers } from '../services/api';
import CustomerCard from './CustomerCard';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCustomers().then(data => {
      setCustomers(data.customers);
      setFiltered(data.customers);
    });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    setFiltered(
      customers.filter(c =>
        c.first_name.toLowerCase().includes(value.toLowerCase()) ||
        c.email.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <h2>Customer List</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {filtered.map(customer => (
        <CustomerCard key={customer.user_id} customer={customer} />
      ))}
    </div>
  );
};

export default CustomerList;