import { about } from "@/content/home";
import { serviceCities } from "@/content/locations";
import { site } from "@/content/site";
import type { Article } from "@/content/articles";

export const seo = {
  title: "Dr. Lucas Fraga | Ortopedista de Ombro e Cotovelo em Salvador",
  description:
    "Ortopedista e traumatologista com atuação em cirurgia do ombro e cotovelo em Salvador, Feira de Santana, Camaçari e Candeias. Avaliação especializada, tratamento conservador e cirurgia quando indicada. CREMEB 22.124.",
  keywords: [
    "ortopedista ombro Salvador",
    "ortopedista cotovelo Salvador",
    "especialista em ombro Salvador",
    "especialista em cotovelo Salvador",
    "cirurgia de ombro Salvador",
    "cirurgia de cotovelo Salvador",
    "manguito rotador",
    "epicondilite",
    "ombro congelado",
    "luxação de ombro",
    "Dr. Lucas Fraga",
  ],
};

/** Dados estruturados (schema.org) do médico — ajudam buscas locais. */
export function physicianJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${site.url}/#physician`,
    name: site.name,
    description: seo.description,
    url: site.url,
    image: `${site.url}/images/dr-lucas-fraga-jaleco.jpg`,
    logo: `${site.url}/brand/logo-full-color.png`,
    telephone: site.phone.e164,
    email: site.email,
    medicalSpecialty: ["Musculoskeletal", "Surgical"],
    knowsAbout: [
      "Cirurgia do ombro",
      "Cirurgia do cotovelo",
      "Lesões do manguito rotador",
      "Instabilidade do ombro",
      "Capsulite adesiva",
      "Epicondilite",
      "Artroscopia",
    ],
    identifier: { "@type": "PropertyValue", propertyID: "CRM", value: site.crm },
    address: { "@type": "PostalAddress", addressLocality: "Salvador", addressRegion: "BA", addressCountry: "BR" },
    areaServed: serviceCities.map((c) => ({ "@type": "City", name: `${c.city}, ${c.state}` })),
    memberOf: [
      { "@type": "MedicalOrganization", name: "Sociedade Brasileira de Cirurgia do Ombro e Cotovelo (SBCOC)" },
    ],
    alumniOf: about.timeline.map((t) => ({ "@type": "EducationalOrganization", name: t.where.split(" · ")[0] })),
    sameAs: [site.instagram.url],
  };
}

export function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    inLanguage: "pt-BR",
    url: `${site.url}/conteudos/${article.slug}`,
    author: { "@id": `${site.url}/#physician`, "@type": "Physician", name: site.name },
    reviewedBy: { "@type": "Physician", name: site.name },
    about: { "@type": "MedicalCondition", name: article.title.split(":")[0] },
  };
}

/** Serializa JSON-LD com escape de "<" (evita injeção de </script>). */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
