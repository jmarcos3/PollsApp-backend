
export class PollResponseDto {
  id: string;
  title: string;
  description?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  options: Array<{
    id: string;
    text: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}
