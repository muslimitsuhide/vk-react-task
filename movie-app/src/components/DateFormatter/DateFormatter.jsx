import React from 'react';

const DateFormatter = ({ dateString }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
  };

  return <span>{formatDate(dateString)}</span>;
};

export default DateFormatter;