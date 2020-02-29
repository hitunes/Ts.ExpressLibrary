import { RouteHandlerDescriptor } from './../types';
import { MetadataKeys } from './MetadataKeys';
import { Methods } from './Methods';
import 'reflect-metadata'

function routeBinder(method: string) {
  return function(path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.PATH, path, target, key)
      Reflect.defineMetadata(MetadataKeys.METHOD, method, target, key)
    }
  }
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);