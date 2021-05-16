/**
 * 类装饰器
 * 访问符装饰器
 * 属性装饰器
 * 方法装饰器
 * 参数装饰器
 */

/**
 * @description 类装饰器
 * @param key   传入路由字符串或者是类
 */
export function controllar<T extends {new(...args:any[]): {}}>(key: string | T): any {
  console.log('类装饰器执行')
  if (typeof key === 'string') {
    return function <T extends {new(...args:any[]): {}}>(target: T) {
      return class extends target {
        route = key;
      }
    }
  }
  return class extends key{
    route = ''
  }
}

/**
 * @description       属性装饰器
 * @param target      对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param propertyKey 属性名称
 */
export function readOnly(value: any) {
  console.log('属性装饰器执行')
  return function(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      writable: false,
      value
    })
  }
}

/**
 * @description        方法装饰器
 * @param target       类
 * @param methond      方法名称
 * @param descriptor   属性描述符
 */
export function func(target: any, methond: string, descriptor: PropertyDescriptor) {
  console.log('方法装饰器执行')
  const oldValue = descriptor.value;
  const paramsMap = oldValue.paramsMap || []
  descriptor.value = function (args) {
    // 若有用装饰器取参
    if (paramsMap.length > 0) {
      const params = [];
      for (const paramsMapKey of paramsMap) {
        params.push(args[paramsMapKey])
      }
      return oldValue.apply(this, [...params])
    }
    return oldValue.apply(this, [args])
  }
  return descriptor
}

/**
 * @description      参数装饰器
 * @param target     类
 * @param methond    当前参数所处的方法名
 * @param argIndex   当前参数处于第几个参数
 */
export function requestParams(paramKey) {
  console.log('参数装饰器执行')
  return function (target: any, methond: string, argIndex: number) {
    const paramsMap = target[methond].paramsMap || []
    paramsMap[argIndex] = paramKey;
    target[methond].paramsMap = paramsMap
  }
}

/**
 * @description         访问器装饰器
 * @param target        类
 * @param propertyKey   成员的名字
 * @param descriptor    成员的属性描述符
 */
export function configurable(value: boolean) {
  console.log('访问器装饰器执行')
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.configurable = value;
    return descriptor;
  }
}
