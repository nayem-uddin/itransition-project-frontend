export default function UserInfo() {
  const fields = ["ID", "Full name", "Username", "Email ID"];
  const props = ["id", "fullName", "username", "email"];
  return (
    <>
      <table className="table table-bordered">
        <tbody>
          {fields.map((field, index) => (
            <tr key={index}>
              <th scope="row">{field}</th>
              <td>{sessionStorage.getItem(props[index])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
