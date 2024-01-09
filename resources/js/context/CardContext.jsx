import { createContext, useContext, useState } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cardData, setCardData] = useState({});

  const chooseCard = (item) => {
    setCardData(item);
  };

  return (
    <CardContext.Provider value={{ chooseCard, cardData }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  return useContext(CardContext);
};
