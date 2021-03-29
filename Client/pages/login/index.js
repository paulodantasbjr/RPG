import { useState } from "react"
import { Title, Wrapper, Container } from "./style"

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <Container>
      <Wrapper>
        <form onSubmit={loginSubmit}>
          <Title>Login</Title>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={onChangeInput}
          />

          <input
            type="password"
            name="password"
            required
            autoComplete="on"
            placeholder="Password"
            value={user.password}
            onChange={onChangeInput}
          />

          <div className="row">
            <button type="submit">Login</button>
          </div>
        </form>
      </Wrapper>
    </Container>
  )
}
