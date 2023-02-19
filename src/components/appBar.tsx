import Button from './button';

function AppBar({
  roomId,
  onLeave,
}: {
  roomId: string;
  onLeave: () => void;
}) {
  return (
    <>
      <h1>Room: </h1>
      <input type='text' defaultValue={roomId} disabled />
      <Button label='leave' handleClick={onLeave} />
    </>
  );
}

export default AppBar;
