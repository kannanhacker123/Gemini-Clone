import PropTypes from "prop-types";
import { assets } from "../../assets/assets";

const cardData = [
  { text: "Suggest a beautiful place to visit", icon: assets.compass_icon },
  { text: "Summarize a story", icon: assets.bulb_icon },
  { text: "Make a code snippet", icon: assets.question_icon },
  { text: "Improve the readability of the following code", icon: assets.code_icon },
];

export const Cards = ({ onSend }) => {
  return (
    <div className="cards">
      {cardData.map((card, index) => (
        <div key={index} className="card" onClick={() => onSend(card.text)}>
          <p>{card.text}</p>
          <img src={card.icon} alt={`${card.text} Icon`} />
        </div>
      ))}
    </div>
  );
};
Cards.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default Cards;
