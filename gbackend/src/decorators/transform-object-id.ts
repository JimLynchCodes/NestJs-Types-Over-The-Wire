import { Transform } from 'class-transformer/decorators';
import { ObjectId } from 'mongodb';

export function TransformObjectId() {
    const transformToClassFn = Transform((it) => new ObjectId(it), { toClassOnly: true });
    const transformToPlainFn = Transform((it: ObjectId) => it.toHexString(), { toPlainOnly: true });

    return (target: any, key: string) => {
        transformToClassFn(target, key);
        transformToPlainFn(target, key);
    }
}

