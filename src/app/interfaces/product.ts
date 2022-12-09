export interface Product {
  id: string,
  nameProd: string,
  supplier: string,
  ft: string,
  composition: number,
  danger: string,
  numberCase: string,
  transport: number,
  url: string,
  city: 'Bogota' | 'Cali' | 'Cali-Bogota'
}

export const Cities = ['Bogota', 'Cali', 'Cali-Bogota']


