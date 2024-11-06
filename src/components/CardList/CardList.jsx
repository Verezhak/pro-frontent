

// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCardsByColumnId } from "../../redux/card/selectors.js";
// import { selectToken } from "../../redux/auth/selectors.js";
// import { setSelectedBoard } from "../../redux/boards/slice.js";
// import { fetchCards } from "../../redux/card/operations.js";

const CardList = ({ columnId }) => {
    // const dispatch = useDispatch();
    // const token = useSelector(selectToken);
    // const boardId = setSelectedBoard._id;
    const cards = useSelector((state) => selectCardsByColumnId(state, columnId));
    console.log("Fetched Cards:", cards);


    return (
        <div className="cards-container">
            {cards.length === 0 ? (
                <p>No cards available in this column.</p>
            ) : (
                cards.map((card) => (
                    <div key={card._id} className="card">
                        <h5>{card.title}</h5>
                        <p>{card.description}</p>
                        <span style={{ backgroundColor: card.color }}>{card.color}</span>
                    </div>
                ))
            )}
        </div>
    );
}

export default CardList;
