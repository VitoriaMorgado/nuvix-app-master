import { IPayment } from "../interfaces/IPayment";
import { ApiService } from "./apiService"

export default class PaymentService extends ApiService<IPayment> {
  constructor() {
    super(
      "http://10.63.45.33:8080/pagamentos",
      "L0CEpDyTAb9ICOTPRzNNnlxCsmFQdLdVrhkJfgWsmCRkYdBtt7tx6XaB9bMHSJeydW2yo4pHF05NvEcX6IN10WaNOI5h36xnobfS"
    );
  }

  // Retorna { id, client_secret }
  async paymentIntent(
    valor: number
  ): Promise<{ id: string; client_secret: string }> {
    const response = await fetch(this._baseUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ valor }),
    });

    const text = await response.text();
    console.log("Resposta POST:", text);

    if (!response.ok) throw new Error(`HTTP ${response.status}: ${text}`);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("JSON inválido: " + text);
    }

    if (!data.id || !data.client_secret) {
      throw new Error("Faltam id ou client_secret: " + JSON.stringify(data));
    }

    return { id: data.id, client_secret: data.client_secret };
  }

  // Usa o ID do PaymentIntent
  async confirmPayment(paymentIntentId: string): Promise<IPayment> {
    const response = await fetch(this._baseUrl, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({ id_pagamento: paymentIntentId }),
    });

    const text = await response.text();
    console.log("Resposta PUT:", text);

    if (!response.ok) throw new Error(`Falha na confirmação: ${text}`);

    return JSON.parse(text);
  }
  //Métodos não utilizados
  getById(): Promise<IPayment> {
    throw new Error("Não implementado");
  }
  getAll(): Promise<IPayment[]> {
    throw new Error("Não implementado");
  }
  create(): Promise<IPayment> {
    throw new Error("Não implementado");
  }
  update(): Promise<IPayment> {
    throw new Error("Não implementado");
  }
  delete(): Promise<void> {
    throw new Error("Não implementado");
  }
}
