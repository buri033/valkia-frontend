'use client';

import { useState, useEffect, useCallback } from 'react';
import { CreateInteractionInput, Interaction } from '../domain/types';
import { interactionService } from '../services/interaction.service';
import { useAuth } from '../../auth/hooks/useAuth';

export function useInteractions() {
  const { user } = useAuth();
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInteractions = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await interactionService.getMyInteractions();
      setInteractions(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al cargar interacciones';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchInteractions();
  }, [fetchInteractions]);

  const createInteraction = async (data: CreateInteractionInput): Promise<Interaction> => {
    const created = await interactionService.createInteraction(data);
    setInteractions((prev) => [created, ...prev]);
    return created;
  };

  return {
    interactions,
    isLoading,
    error,
    createInteraction,
    refetch: fetchInteractions,
  };
}
