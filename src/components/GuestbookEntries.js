import React from 'react';

const GuestbookEntries = ({ entries }) => {
  return (
    <ul>
      {entries.map(entry => (
        <li key={entry.id}>{entry.message}</li>
      ))}
    </ul>
  );
};

export default GuestbookEntries;