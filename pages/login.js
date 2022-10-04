export default function Login() {
  const onSubmit = event => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email"></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password"></input>
        </div>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}
