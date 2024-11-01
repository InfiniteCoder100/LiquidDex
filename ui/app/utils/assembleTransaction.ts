import fetch from 'isomorphic-unfetch';
import { AssembleResponse } from '../types/odosApiTypes';

export async function assembleTransaction(userAddr: string, pathId: string, simulate = true): Promise<AssembleResponse> {
  const assembleUrl = `${process.env.NEXT_PUBLIC_ODO_API_URL}/assemble`;

  const body = {
    userAddr,
    pathId,
    simulate,
  };

  try {
    const response = await fetch(assembleUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Assembly Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error assembling transaction:', error);
    throw error;
  }
}
