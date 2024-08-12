export type dashboardLink = {
  label: string;
  href: string;
  bottom_Link: Array<{
    label: string;
    href: string;
  }>;
};
export const DashboardLink: dashboardLink[] = [
  {
    label: "Patrimoine",
    href: "#",
    bottom_Link: [
      {
        label: "Propriété",
        href: "/dashboard/patrimoine/proprietaire",
      },
      {
        label: "Les Lots",
        href: "/dashboard/patrimoine/lots",
      },
    ],
  },
  {
    label: "Location",
    href: "#",
    bottom_Link: [
      {
        label: "Locataire",
        href: "/dashboard/location/locataire",
      },
      {
        label: "Dossiers de Location",
        href: "/dashboard/location/dossier-de-location",
      },
    ],
  },
  {
    label: "Facturation",
    href: "#",
    bottom_Link: [
      {
        label: "Encaissements",
        href: "/dashboard/facturation/encaissement",
      },
      {
        label: "Quittance de Loyer",
        href: "/dashboard/facturation/quittance-de-loyer",
      },
    ],
  },
  {
    label: "Centrale à Ticket",
    href: "/dashboard/demande",
    bottom_Link: [],
  },
];
