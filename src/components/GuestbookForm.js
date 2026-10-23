import React from 'react';

const GuestbookForm = () => {
  return (
    <form>
      <input type="text" placeholder="Your name" />
      <textarea placeholder="Leave a message..." />
      <button type="submit">Submit</button>
    </form>
  );
};

export default GuestbookForm;