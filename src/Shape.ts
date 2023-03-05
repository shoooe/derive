import { AutocompleteHelper } from './AutocompleteHelper';
import { ValidShape } from './ValidShape';

/**
 * Type used to define a shape that can then be reused as a `Derive` shape
 * or inside other shapes.
 *
 * @example
 * type BookShape = Shape<Book, {
 *     id: true;
 *     title: true;
 *     author: {
 *         id: true;
 *         name: Alias<User, 'name'>
 *     }
 * }>;
 */
export type Shape<
  Target,
  Shape extends AutocompleteHelper<Target> & ValidShape<Target, Shape>,
> = Shape;
