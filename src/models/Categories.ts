import Product from "./Product";

export default interface Categories {
  [key: string]: Product[] | undefined;
}
