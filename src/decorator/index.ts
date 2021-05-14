
/**
 * @description 类装饰器
 * @author      qiangang
 * @date        2020/12/30
 * @param key   传入路由字符串或者是类
 */
export function controllar<T extends {new(...args:any[]): {}}>(key: string | T): any {
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
 * @author            qiangang
 * @date              2020/12/30
 * @param target      对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param propertyKey 属性名称
 */
export function readOnly(value: any) {
  return function(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
      writable: false,
      value
    })
  }
}

/**
 * @description        方法装饰器
 * @param target       类的构造函数
 * @param methond         方法名称
 * @param descriptor   方法的property
 */
export function func(target: any, methond: any, descriptor: any) {
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
 * @param target     类的构造函数
 * @param methond       当前参数所处的方法
 * @param argIndex   当前参数处于第几个参数
 */
export function requestParams(paramKey) {
  return function (target: any, methond: any, argIndex: any) {
    const paramsMap = target[methond].paramsMap || []
    paramsMap[argIndex] = paramKey;
    target[methond].paramsMap = paramsMap
  }
}
