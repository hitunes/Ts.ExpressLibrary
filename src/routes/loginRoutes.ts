import { Router, Request, Response } from 'express'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}
const router = Router()

router.get('/login', (req: Request, res: Response) => {
  res.send(`
  <form method="POST">
    <div>
      <label>Email</label>
      <input name="email"/>
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password"/>
    </div>
    <button>Submit</button>
  </form>
  `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if( email && password && email === 'hi@hi.com' && password === 'abc') {
    req.session = {loggedIn: true}
    res.redirect('/')
  } else {
    res.send('Invalid email and password')
  }
});

router.get('/', (req: RequestWithBody, res: Response) => {
  //req.session
  if(req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You're logged in with}</div>
        <a href="/logout">Logout</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <div>You're not logged in</div>
        <a href="/login">Login</a>
      </div>
    `)
  }
})


export { router }