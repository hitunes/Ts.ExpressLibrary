import { Response, NextFunction } from 'express';
import { RequestWithBody } from './types';
import { get, use, controller } from "./decorators"
function requireAuth(req: RequestWithBody, res: Response, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403)
  res.send('Not permitted')
}
@controller('')
class RootController {
  @get('/')
  getRoot(req: RequestWithBody, res: Response) {
    if (req.session?.loggedIn) {
      res.send(`
        <div>
          <div>You're logged in with</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `)
    } else {
      res.send(`
        <div>
          <div>You're not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `)
    }
  }
  @get('/protected')
  @use(requireAuth)
  getProtected(req: RequestWithBody, res: Response) {
    res.send('Welcome to protected route, logged in user')
  }
}