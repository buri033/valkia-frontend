import { httpClient } from '../../common/http';
import { CreateInteractionInput, Interaction } from '../domain/types';

export const interactionService = {
  async createInteraction(data: CreateInteractionInput): Promise<Interaction> {
    return httpClient<Interaction>('/interaccion', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getMyInteractions(): Promise<Interaction[]> {
    return httpClient<Interaction[]>('/interaccion/mias');
  },

  async getAllInteractions(): Promise<Interaction[]> {
    return httpClient<Interaction[]>('/interaccion');
  },
};
