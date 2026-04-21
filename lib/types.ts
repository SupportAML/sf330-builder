export type SectionA = {
  title: string;
  contractNumber: string;
  solicitationNumber: string;
  date: string;
};

export type SectionB = {
  name: string;
  title: string;
  firm: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
};

export type TeamFirm = {
  id: string;
  role: "Prime" | "Subconsultant" | "JV Partner";
  name: string;
  address: string;
  checkIfBranch: boolean;
};

export type SectionC = {
  firms: TeamFirm[];
};

export type SectionD = {
  imageDataUrl: string | null;
  textDescription: string;
  activeTab: "image" | "text";
};

export type RelevantProject = {
  id: string;
  title: string;
  location: string;
  yearCompleted: string;
  yearConstruction: string;
  cost: string;
  role: string;
  scope: string;
  fee: string;
};

export type PersonResume = {
  id: string;
  name: string;
  role: string;
  yearsTotal: number | string;
  yearsFirm: number | string;
  firm: string;
  education: string;
  registration: string;
  otherQualifications: string;
  relevantProjects: RelevantProject[];
};

export type SectionE = {
  personnel: PersonResume[];
};

export type FirmInvolved = {
  id: string;
  firmName: string;
  role: string;
  location: string;
};

export type Project = {
  id: string;
  title: string;
  location: string;
  yearCompleted: string;
  yearConstructionCompleted: string;
  projectOwner: string;
  pointOfContact: string;
  pointOfContactPhone: string;
  briefDescription: string;
  firmsInvolved: FirmInvolved[];
};

export type SectionF = {
  projects: Project[];
};

export type SectionG = {
  matrix: Record<string, Record<string, boolean>>;
};

export type SectionH = {
  additionalInfo: string;
};

export type SF330Doc = {
  id: string;
  name: string;
  updatedAt: number;
  sectionA: SectionA;
  sectionB: SectionB;
  sectionC: SectionC;
  sectionD: SectionD;
  sectionE: SectionE;
  sectionF: SectionF;
  sectionG: SectionG;
  sectionH: SectionH;
};

export type Identity = {
  name: string;
  firm: string;
  email: string;
};
