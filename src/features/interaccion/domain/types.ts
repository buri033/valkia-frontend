import { Product } from '../../catalogo/domain/types';
import { User } from '../../auth/domain/types';

export interface Interaction {
  id: string;
  userId: string;
  user?: User;
  productId: string;
  product?: Product;
  preference: string;
  notes?: string | null;
  createdAt: string;
}

export interface CreateInteractionInput {
  productId: string;
  preference: string;
  notes?: string;
}
