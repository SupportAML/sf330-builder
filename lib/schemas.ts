import { z } from "zod";

export const sectionASchema = z.object({
  title: z.string(),
  contractNumber: z.string(),
  solicitationNumber: z.string(),
  date: z.string(),
});

export const sectionBSchema = z.object({
  name: z.string(),
  title: z.string(),
  firm: z.string(),
  address: z.string(),
  phone: z.string(),
  fax: z.string(),
  email: z.string(),
});

export const teamFirmSchema = z.object({
  id: z.string(),
  role: z.enum(["Prime", "Subconsultant", "JV Partner"]),
  name: z.string(),
  address: z.string(),
  checkIfBranch: z.boolean(),
});

export const sectionCSchema = z.object({
  firms: z.array(teamFirmSchema),
});

export const sectionDSchema = z.object({
  imageDataUrl: z.string().nullable(),
  textDescription: z.string(),
  activeTab: z.enum(["image", "text"]),
});

export const relevantProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  location: z.string(),
  yearCompleted: z.string(),
  yearConstruction: z.string(),
  cost: z.string(),
  role: z.string(),
  scope: z.string(),
  fee: z.string(),
});

export const personResumeSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  yearsTotal: z.union([z.number(), z.string()]),
  yearsFirm: z.union([z.number(), z.string()]),
  firm: z.string(),
  education: z.string(),
  registration: z.string(),
  otherQualifications: z.string(),
  relevantProjects: z.array(relevantProjectSchema),
});

export const sectionESchema = z.object({
  personnel: z.array(personResumeSchema),
});

export const firmInvolvedSchema = z.object({
  id: z.string(),
  firmName: z.string(),
  role: z.string(),
  location: z.string(),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  location: z.string(),
  yearCompleted: z.string(),
  yearConstructionCompleted: z.string(),
  projectOwner: z.string(),
  pointOfContact: z.string(),
  pointOfContactPhone: z.string(),
  briefDescription: z.string(),
  firmsInvolved: z.array(firmInvolvedSchema),
});

export const sectionFSchema = z.object({
  projects: z.array(projectSchema),
});

export const sectionGSchema = z.object({
  matrix: z.record(z.string(), z.record(z.string(), z.boolean())),
});

export const sectionHSchema = z.object({
  additionalInfo: z.string(),
});

export const identitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  firm: z.string().min(1, "Firm is required"),
  email: z.string().email("Valid email required"),
});
