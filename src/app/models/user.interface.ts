export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  company: string;
  department: string;
  position: string;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  phone: string;
  skills: string[];
}


export interface Language {
  code: string;
  name: string;
}
