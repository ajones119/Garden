export type Section = {
  id: string;
  title: string;
  subsections?: Section[];
};
export interface BaseDemoLayoutProps {
  dateAdded?: string;
  title?: string;
  topics?: string[];
  sections?: Section[];
}
