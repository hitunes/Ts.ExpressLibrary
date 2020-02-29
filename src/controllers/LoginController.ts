import { Response } from 'express';
import { RequestWithBody } from './types';
import { get, bodyValidator, controller, post } from './decorators';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: RequestWithBody, res: Response): void {
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
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response): void {
    const { email, password } = req.body;

    if( email && password && email === 'hi@hi.com' && password === 'abc') {
      req.session = {loggedIn: true}
      res.redirect('/')
    } else {
      res.send('Invalid email and password')
    }
  }
  @get('/logout')
  getLogout(req: RequestWithBody, res: Response) {
    req.session = undefined
    res.redirect('/')
  }
}
