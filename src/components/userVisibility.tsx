function UserVisibility({
  visibility = false,
}: {
  visibility: boolean | undefined;
}) {
  return <span>{!visibility ? '🟢 online' : '🟡 away'}</span>;
}

export default UserVisibility;
