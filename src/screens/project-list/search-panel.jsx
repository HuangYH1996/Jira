export const SearchPanel = ({ users, param, setParam }) => {

  return <form>
    <div>
      {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
      <input value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value
      })}></input>
      <select value={param.personId} onChange={evt => setParam({
        ...param,
        personId: evt.target.value
      })}>
        <option value="">负责人</option>
        {
          users.map(user => (
            <option key={user.id} value={user.personId}>{user.name}</option>
          ))
        }
      </select>
    </div>
  </form>
}