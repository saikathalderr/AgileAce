function UserVisibility({
  visibility = false,
}: {
  visibility: boolean | undefined;
}) {
  return <small>{!visibility ? '🟢' : '🟡'}</small>;
}

export default UserVisibility;
