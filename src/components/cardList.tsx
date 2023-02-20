import CardItem from './cardItem';

function CardList() {
  const cardsArray = [
    '0',
    '½',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '20',
    '40',
    '100',
    '?',
    '∞',
    '☕',
  ];
  return (
    <>
      {cardsArray.map((card: string, idx: number) => (
        <CardItem key={card + idx + 1} label={card} />
      ))}
    </>
  );
}

export default CardList;
