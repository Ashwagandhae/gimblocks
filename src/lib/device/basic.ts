type UnUnion<T, S> = T extends S ? ([S] extends [T] ? T : never) : never;
type NotUnion<T> = UnUnion<T, T>;

/**
 * A literal string which isn't dynamically created. Used to specify block fields, which can't be dynamic.
 *
 * @example
 * let x: LiteralString<'hello'> = 'hello';
 * let y: LiteralString<'hello'> = 'hel' + 'lo'; // Error
 *
 */
export type LiteralString<T extends string> = string extends T
  ? never
  : NotUnion<T>;

/**
 * A literal number which isn't dynamically created. Used to specify block fields, which can't be dynamic.
 *
 * @example
 * let x: LiteralNumber<3> = 3;
 * let y: LiteralNumber<3> = 3 + 0; // Error
 */
export type LiteralNumber<T extends number> = number extends T
  ? never
  : NotUnion<T>;

/**
 * The color type. A hex string, rgb value, etc.
 *
 * @example
 * '#ff0000'
 * 'rgb(255, 0, 0)'
 */
export type Color<T extends string> = LiteralString<T>;
