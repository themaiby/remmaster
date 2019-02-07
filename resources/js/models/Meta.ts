import {plainToClass} from "class-transformer";

export interface MetaScheme {
  current_page: number | null;
  from: number | null;
  last_page: number | null;
  path: string | null;
  per_page: number | null;
  to: number | null;
  total: number | null;
}

export class Meta implements MetaScheme {
  current_page: number | null = null;
  from: number | null = null;
  last_page: number | null = null;
  path: string | null = null;
  per_page: number | null = null;
  to: number | null = null;
  total: number | null = null;
}

export const createMetaModel = (meta: MetaScheme) => plainToClass(Meta, meta);
export const defaultMetaModel: MetaScheme = {
  current_page: null,
  from: null,
  last_page: null,
  path: null,
  per_page: null,
  to: null,
  total: null
};
