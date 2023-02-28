function UserVisibility({
  visibility = false,
}: {
  visibility: boolean | undefined;
}) {
  return (
    <small>{!visibility ? <b>🟢 Online</b> : <b>🟡 Away</b>}</small>
  );
}

export default UserVisibility;
