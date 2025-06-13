export default function UserInfo() {
  return (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">ID</th>
            <td>{sessionStorage.getItem("id")}</td>
          </tr>
          <tr>
            <th scope="row">Full name</th>
            <td>{sessionStorage.getItem("fullName")}</td>
          </tr>
          <tr>
            <th scope="row">Username</th>
            <td>{sessionStorage.getItem("username")}</td>
          </tr>
          <tr>
            <th scope="row">Email ID</th>
            <td>{sessionStorage.getItem("email")}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
