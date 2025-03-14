export type Toast = {
  id: string;
  title: string;
  duration: number;
  type: "info" | "success" | "error";
  children: React.ReactNode;
};
