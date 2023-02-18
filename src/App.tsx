import CreateRoom from './components/createRoom';
import JoinRoom from './components/joinRoom';

function App(props: any) {
  return (
    <div>
      <CreateRoom />
      <hr />
      <JoinRoom />
    </div>
  );
}

export default App;
