const BASE_URL = 'http://localhost:5000/api/orders';

const orderService = {
  sendOrder: async (to, from, quantity, transporter, orderID) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ to, from, quantity, transporter, orderID}),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
  },

  getOrders: async (transporterID) => {
    // console.log("T id is : ",transporterID);
    const response = await fetch(`${BASE_URL}/transporter/${transporterID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }

    const { orders } = await response.json();
    console.log(orders)
    return orders;
  },

  replyToOrder: async (orderID, price) => {
    const response = await fetch(`${BASE_URL}/${orderID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ price }),
    });

    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
  },
  getTransporters: async () => {
    const response = await fetch(`${BASE_URL}/transporters`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    if (!response.ok) {
      const { error } = await response.json();
      throw new Error(error);
    }
  
    const data = await response.json();
    console.log(data.transporters);
    return data.transporters;
  },  
};

export default orderService;
