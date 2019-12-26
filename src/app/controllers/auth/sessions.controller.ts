import { Request, Response } from 'express'
import {
  controller,
  httpPost,
  interfaces,
  request,
  response
} from 'inversify-express-utils'
import validate from 'app/middlewares/validate.middleware'
import { signinValidation } from './sessions.validate'

@controller('/auth')
export default class SessionsController implements interfaces.Controller {
  @httpPost('/signin', validate(signinValidation))
  public async signIn(
    @request() req: Request,
    @response() res: Response
  ): Promise<Response> {
    return res.send('Yow')
  }
}
