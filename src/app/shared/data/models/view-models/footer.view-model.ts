export interface FooterViewModel {
  aboutUsSummary: string;
  links: FooterLinks[];
  socials: FooterLinks;
}

interface FooterLinks {
  title: string;
  links: Array<{
    url: string;
    title: string;
    icon: number;
  }>;
}
