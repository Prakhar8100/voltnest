import { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [activeBookings, setActiveBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);

  const addBooking = (booking) => {
    setActiveBookings([...activeBookings, booking]);
  };

  const cancelBooking = (id) => {
    setActiveBookings(activeBookings.filter(b => b.id !== id));
  };

  return (
    <BookingContext.Provider value={{ activeBookings, bookingHistory, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
