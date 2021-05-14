import {
  controllar,
  readOnly,
  func,
  requestParams
} from "@/decorator";

@controllar
class UserControllar {
  constructor() {
  }

  @readOnly('userController')
  name: string;

  @func
  public test(@requestParams('id') id, @requestParams('a') a?) {
    console.log(id, a)
  }

  @func
  public test2(arg1) {
    console.log('test2=====', arg1)
  }

  public test3(arg1) {
    console.log('test3=====', arg1)
  }
}

const  _UserControllar = new UserControllar();
_UserControllar.test({id: 1, a: 1})
_UserControllar.test2({id: 2, a: 2})
_UserControllar.test3({id: 3, a: 3})

