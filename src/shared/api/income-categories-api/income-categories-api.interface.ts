import {
  CreateIncomeCategoryDTO,
  IncomeCategoriesDTO,
  IncomeCategoryDTO,
  IncomeCategoryID,
  UpdateIncomeCategoryDTO,
} from "./dtos";

export interface IncomeCategoriesAPI {
  getIncomeCategories(): Promise<IncomeCategoriesDTO>;
  setIncomeCategories(categories: IncomeCategoriesDTO): Promise<void>;
  createIncomeCategory(
    category: CreateIncomeCategoryDTO,
  ): Promise<IncomeCategoryDTO>;
  updateIncomeCategory(
    id: IncomeCategoryID,
    category: UpdateIncomeCategoryDTO,
  ): Promise<IncomeCategoryDTO>;
  deleteIncomeCategory(id: IncomeCategoryID): Promise<IncomeCategoryID[]>;
}
