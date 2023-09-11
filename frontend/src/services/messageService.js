const BASE_URL = 'http://localhost:5000/api/messages';

const messageService = {
  getMessages: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const { messages } = await response.json();
      console.log(messages);
      return messages;
    } catch (error) {
      throw new Error('Failed to retrieve messages');
    }
  },


  searchMessages: async (orderID, to, from) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderID, to, from }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      const { messages } = await response.json();
      console.log("msg in search",messages);

      return messages;
    } catch (error) {
      throw new Error('Failed to search messages');
    }
  },
};

export default messageService;
