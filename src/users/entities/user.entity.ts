export class User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  roles: 'Mentor' | 'Trainee';
  createdAt: Date;
  updatedAt: Date;
}
